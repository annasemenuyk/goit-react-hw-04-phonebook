import React, { Component } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';
import ContactList from './ContactList';
import Container from './Container';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(contacts);

    if (parcedContacts) {
      this.setState({ contacts: parcedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const alreadyFind = this.state.contacts.find(
      contact => contact.name === name
    );

    alreadyFind
      ? alert(`${name} is already in contacts.`)
      : this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  findContact = event => {
    this.setState({ filter: event.target.value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const FilterContacts = this.getFilterContacts();

    return (
      <Container>
        <h1 className="Title">Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className="Title">Contacts</h2>
        <ContactFilter value={filter} onFindContact={this.findContact} />
        <ContactList
          onFilteredContacts={FilterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
