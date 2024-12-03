import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Type pour définir la structure d'un contact
interface Contact {
  name: string;
  email: string;
}

// Props du composant
interface AddContactProps {
  onAddContact: (contact: Contact) => void;
  onNavigateHome: () => void;
}

export default function AddContact({ onAddContact, onNavigateHome }: AddContactProps) {
  // État local pour stocker les valeurs du formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs
    if (!name || !email) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires !",
        variant: "destructive"
      });
      return;
    }

    // Envoi des données au composant parent
    onAddContact({ name, email });

    // Réinitialisation du formulaire
    setName('');
    setEmail('');

    // Retour à la page d'accueil
    onNavigateHome();
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Ajouter un Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Entrez le nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Entrez l'email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Ajouter le Contact
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}