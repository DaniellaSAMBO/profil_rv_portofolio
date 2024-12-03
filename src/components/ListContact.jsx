import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Pencil } from "lucide-react";
import { ContactContext } from "@/context/ContactContext";
import Modal from "@/components/Modal/Modal";

export default function ListContact({ searchTerm }) {
  const { contacts, removeContact } = useContext(ContactContext);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  // Filter contacts based on search term
  const filteredContacts = contacts?.filter((person) => 
    person?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      {!contacts || filteredContacts.length === 0 ? (
        <div className="bg-gray-100 shadow-md rounded-lg p-4 text-center font-semibold">
          AUCUNE DONNEE 😵😵
        </div>
      ) : (
        <ul className="bg-gray-100 shadow-md rounded-lg p-4 space-y-4">
          {filteredContacts.map((person) => (
            <li
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className="flex items-center p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span className="text-primary text-lg font-semibold">
                  {person.name.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPerson(person);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <Pencil className="h-4 w-4 text-gray-500" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeContact(person.id);
                  }}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                >
                  <svg
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedPerson && (
        <Modal person={selectedPerson} onClose={handleCloseModal} />
      )}
    </>
  );
}

ListContact.propTypes = {
  searchTerm: PropTypes.string.isRequired
};