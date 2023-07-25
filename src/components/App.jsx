import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import './app.css';
import Notiflix from 'notiflix';

export class App extends Component {
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
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      this.setState({ contacts: parsedContacts});
      return
    }
    else {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    if (
      contacts.filter(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      ).length !== 0
    ) {
      Notiflix.Notify.failure(
        `${name} is already in contacts`
      );
      return;
    } else if (
      contacts.filter(contact => contact.number === number).length !== 0
    ) {
      Notiflix.Notify.failure(
        `The number ${number} is already in contacts`
      );
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const updatedContacts = [...contacts, newContact];

    this.setState({
      contacts: updatedContacts,
    });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    Notiflix.Notify.success('Contacto guardado exitosamente');
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: updatedContacts,
    });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    if (updatedContacts.length === 0)
      Notiflix.Notify.info(`Contacts list is empty`);
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="phonebook-container">
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>

        <ContactFilter value={filter} onChange={this.handleFilterChange} />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
