import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: crypto.randomUUID() }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateContact = (id, updatedContact) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, ...updatedContact } : contact
    ));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, removeContact, updateContact }}>
      {children}
    </ContactContext.Provider>
  );
}

ContactProvider.propTypes = {
  children: PropTypes.node.isRequired
};