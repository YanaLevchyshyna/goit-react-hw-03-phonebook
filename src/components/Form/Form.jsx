import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  FormWrapper,
  FormEl,
  LabelName,
  InputName,
  AddContactButton,
} from './Form.styled';

class Form extends Component {
  state = { name: '', number: '' };

  // Відповідає за оновлення стану
  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  // Викликається під час відправлення форми
  handleSubmit = e => {
    e.preventDefault();
    const newContact = { ...this.state, id: 'id' + nanoid() };
    this.props.onSubmit(newContact);
    console.log('this state', this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <FormWrapper>
        <FormEl onSubmit={this.handleSubmit}>
          <LabelName htmlFor={name}>
            Name
            <InputName
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe,
          dash and spaces. For example Adrian, Jacob Mercer,
          Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </LabelName>

          <LabelName htmlFor={number}>
            Number
            <InputName
              placeholder="Enter number"
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </LabelName>
          <AddContactButton type="submit">Add contact</AddContactButton>
        </FormEl>
      </FormWrapper>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
