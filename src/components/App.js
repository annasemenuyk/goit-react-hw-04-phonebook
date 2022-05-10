import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';
import ContactList from './ContactList';
import Container from './Container';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('Contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(contacts);

    if (parcedContacts) {
      setContacts(parcedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const alreadyFind = contacts.find(contact => contact.name === name);

    alreadyFind
      ? toast.error(`${name} is already in contacts.`)
      : setContacts(prevState => [contact, ...prevState]);
  };

  const findContact = event => {
    setFilter(event.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  return (
    <Container>
      <h1 className="Title">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="Title">Contacts</h2>
      <ContactFilter value={filter} onFindContact={findContact} />
      <ContactList
        onFilteredContacts={getFilterContacts()}
        onDeleteContact={deleteContact}
      />
      <ToastContainer />
    </Container>
  );
};

export default App;
