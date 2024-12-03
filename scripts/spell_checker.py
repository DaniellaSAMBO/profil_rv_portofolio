import os
import re
from typing import List, Set, Tuple
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
import json

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class SpellChecker:
    def __init__(self):
        self.whitelist = {
            # Technical terms
            'tsx', 'jsx', 'js', 'ts', 'npm', 'src', 'ui', 'css', 'html', 'api',
            'url', 'id', 'px', 'md', 'lg', 'xl', 'btn', 'nav', 'img', 'svg',
            'onclick', 'href', 'div', 'params', 'util', 'utils', 'config',
            'async', 'await', 'const', 'let', 'var', 'func', 'args', 'props',
            'ref', 'refs', 'dom', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'ico',
            'btn', 'msg', 'prev', 'next', 'min', 'max', 'cmd', 'ctrl', 'alt',
            
            # French words
            'aucune', 'donnee', 'ajouter', 'membre', 'succès', 'erreur',
            'téléphone', 'prénom', 'numéro', 'ajout', 'annuler', 'entrez',
            'valider', 'formulaire', 'recherche', 'utilisateur', 'connexion',
            'déconnexion', 'paramètres', 'configuration'
        }
        self.cache_file = 'spell_check_cache.json'
        self.load_cache()

    def load_cache(self):
        """Load previously checked words from cache."""
        try:
            with open(self.cache_file, 'r', encoding='utf-8') as f:
                self.word_cache = json.load(f)
        except FileNotFoundError:
            self.word_cache = {}

    def save_cache(self):
        """Save checked words to cache."""
        with open(self.cache_file, 'w', encoding='utf-8') as f:
            json.dump(self.word_cache, f)

    def get_text_from_file(self, file_path: str) -> str:
        """Extract text content from a file."""
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()

    def extract_words(self, text: str) -> Set[str]:
        """Extract words from text, ignoring code syntax."""
        # Remove JSX/TSX tags
        text = re.sub(r'<[^>]+>', ' ', text)
        # Remove import statements
        text = re.sub(r'import.*?;', ' ', text)
        # Remove camelCase/PascalCase variables and split them
        words = re.findall(r'[A-Za-z]+', text)
        result = set()
        
        for word in words:
            # Split camelCase and PascalCase
            parts = re.findall(r'[A-Z][a-z]*|[a-z]+', word)
            result.update(part.lower() for part in parts)
        
        return result

    def check_word_online(self, word: str) -> Tuple[bool, List[str]]:
        """Check word spelling using an online dictionary API."""
        if word in self.word_cache:
            return self.word_cache[word]

        try:
            driver = webdriver.Chrome()
            driver.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
            
            # Wait for response
            response = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.TAG_NAME, "pre"))
            )
            
            data = json.loads(response.text)
            is_valid = True
            suggestions = []
            
            if 'title' in data and data['title'] == 'No Definitions Found':
                is_valid = False
                suggestions = data.get('suggestions', [])
            
            self.word_cache[word] = (is_valid, suggestions)
            return is_valid, suggestions
            
        except Exception as e:
            logging.warning(f"Error checking word '{word}': {str(e)}")
            return True, []  # Assume valid in case of error
        finally:
            driver.quit()

    def check_spelling(self, words: Set[str]) -> List[Tuple[str, List[str]]]:
        """Check spelling of words and return misspelled ones with suggestions."""
        misspelled = []
        
        for word in words:
            if len(word) < 2 or word in self.whitelist or not word.isalpha():
                continue
                
            is_valid, suggestions = self.check_word_online(word)
            if not is_valid:
                misspelled.append((word, suggestions))
        
        return misspelled

    def check_file(self, file_path: str) -> List[Tuple[str, List[str]]]:
        """Check spelling in a single file."""
        try:
            content = self.get_text_from_file(file_path)
            words = self.extract_words(content)
            return self.check_spelling(words)
        except Exception as e:
            logging.error(f"Error processing {file_path}: {str(e)}")
            return []

    def check_project(self, src_dir: str = 'src'):
        """Check spelling in the entire project."""
        logging.info("Starting spell check...")
        checked_files = 0
        all_words = set()
        all_misspelled = []

        for root, _, files in os.walk(src_dir):
            for file in files:
                if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                    file_path = os.path.join(root, file)
                    try:
                        content = self.get_text_from_file(file_path)
                        words = self.extract_words(content)
                        all_words.update(words)
                        misspelled = self.check_spelling(words)
                        if misspelled:
                            all_misspelled.extend(misspelled)
                        checked_files += 1
                        logging.info(f"Checked {file_path}")
                    except Exception as e:
                        logging.error(f"Error processing {file_path}: {str(e)}")

        # Save results
        self.save_cache()

        # Print summary
        logging.info(f"\nSpell check completed!")
        logging.info(f"Files checked: {checked_files}")
        logging.info(f"Unique words found: {len(all_words)}")

        if all_misspelled:
            logging.warning("\nPossible spelling errors found:")
            for word, suggestions in all_misspelled:
                suggestion_text = ', '.join(suggestions) if suggestions else 'No suggestions'
                logging.warning(f"- {word} (suggestions: {suggestion_text})")
        else:
            logging.info("\nNo spelling errors found!")

def main():
    checker = SpellChecker()
    checker.check_project()

if __name__ == '__main__':
    main()