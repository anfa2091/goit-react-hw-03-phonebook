import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./contactList.css"

class ContactList extends Component {
  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contact-list-element">
            <span>{contact.name}: </span>
            <span>{contact.number}</span>
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
