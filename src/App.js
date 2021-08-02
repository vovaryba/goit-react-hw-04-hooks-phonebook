import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactsList from './components/ContactsList';
import Form from './components/Form';
import Filter from './components/Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const contact = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    };
    setContacts([contact, ...contacts]);
  };

  const handleCheckUnique = name => {
    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert(name + ' is already in contacts.');
    return !isExistContact;
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Form onSubmit={addContact} onCheckUnique={handleCheckUnique} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}
