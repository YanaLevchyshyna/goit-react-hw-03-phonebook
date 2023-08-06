import { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import Form from './Form/Form';
import { Filter } from './Filter/Filter';
import { Container, Title } from './App.styled';

class App extends Component {
  state = {
    // contacts: [],
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // console.log('App Did Mount');

    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      // console.log('Update contacts ');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = newContact => {
    const { contacts } = this.state;

    const contactIsAdded = contacts.find(
      cont =>
        cont.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        cont.number.trim() === newContact.number.trim()
    );

    if (contactIsAdded) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => {
        return { contacts: [newContact, ...contacts] };
      });
    }
  };

  // Відповідає за оновлення стану list by search
  onSearchFieldChange = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  getContactBySearch = () => {
    const { filter, contacts } = this.state;
    const normalizedToLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedToLowerCase)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(contactItem => contactItem.id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const contactBySearch = this.getContactBySearch();

    return (
      <Container>
        <Title>Phonebook</Title>
        <Form onSubmit={this.onAddContact} />
        <Filter value={filter} onChange={this.onSearchFieldChange} />
        <ContactsList
          contacts={contactBySearch}
          onDelete={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
