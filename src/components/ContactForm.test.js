import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm/>)
});

test('renders the contact form header', () => {
  render(<ContactForm/>)  
  screen.getByText('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>)
  const nameInput = screen.getByLabelText(/first name/i)
  userEvent.type(nameInput, 'Bob')
  const errMessages = screen.getAllByText(/error/i)
  expect (errMessages).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>)
  const subBtn = document.querySelector('input[type="submit"]')
  userEvent.click(subBtn)
  const errMessages = screen.getAllByText(/error/i)
  expect (errMessages).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>)
  const fnInput = screen.getByLabelText('First Name*')
  const lnInput = screen.getByLabelText('Last Name*')
  userEvent.type(fnInput, 'Billy')
  userEvent.type(lnInput, 'Bob')
  const subBtn = document.querySelector('input[type="submit"]')
  userEvent.click(subBtn)
  const errMessages = screen.getAllByText(/error/i)
  expect (errMessages).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>)
  const emailInput = screen.getByLabelText('Email*')
  userEvent.type(emailInput, 'email')
  const errMessages = screen.getByText(/error/i)
  expect (errMessages).toHaveTextContent('email must be a valid email address')
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>)
  const fnInput = screen.getByLabelText('First Name*')
  const emailInput = screen.getByLabelText('Email*')
  const subBtn = document.querySelector('input[type="submit"]')
  userEvent.type(fnInput, 'Billy')
  userEvent.type(emailInput, 'billy@bob.com')
  userEvent.click(subBtn)
  const errMessages = screen.getByText(/error/i)
  expect(errMessages).toHaveTextContent('lastName is a required field')
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm/>)
  const fnInput = screen.getByLabelText('First Name*')
  const lnInput = screen.getByLabelText('Last Name*')
  const emailInput = screen.getByLabelText('Email*')
  const subBtn = document.querySelector('input[type="submit"]')
  userEvent.type(fnInput, 'Billy')
  userEvent.type(lnInput, 'Bob')
  userEvent.type(emailInput, 'billy@bob.com')
  userEvent.click(subBtn)
  const fnDisplay = document.querySelector('p[data-testid="firstnameDisplay"')
  const lnDisplay = document.querySelector('p[data-testid="lastnameDisplay"')
  const emailDisplay = document.querySelector('p[data-testid="emailDisplay"')
  const messageDisplay = document.querySelector('p[data-testid="messageDisplay"')
  expect(fnDisplay).toHaveTextContent('Billy')
  expect(lnDisplay).toHaveTextContent('Bob')
  expect(emailDisplay).toHaveTextContent('billy@bob.com')
  expect(messageDisplay).toBeNull()
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm/>)
  const fnInput = screen.getByLabelText('First Name*')
  const lnInput = screen.getByLabelText('Last Name*')
  const emailInput = screen.getByLabelText('Email*')
  const messageInput = screen.getByLabelText('Message')
  const subBtn = document.querySelector('input[type="submit"]')
  userEvent.type(fnInput, 'Billy')
  userEvent.type(lnInput, 'Bob')
  userEvent.type(emailInput, 'billy@bob.com')
  userEvent.type(messageInput, 'This is Billy Bob')
  userEvent.click(subBtn)
  const fnDisplay = document.querySelector('p[data-testid="firstnameDisplay"')
  const lnDisplay = document.querySelector('p[data-testid="lastnameDisplay"')
  const emailDisplay = document.querySelector('p[data-testid="emailDisplay"')
  const messageDisplay = document.querySelector('p[data-testid="messageDisplay"')
  expect(fnDisplay).toHaveTextContent('Billy')
  expect(lnDisplay).toHaveTextContent('Bob')
  expect(emailDisplay).toHaveTextContent('billy@bob.com')
  expect(messageDisplay).toHaveTextContent('This is Billy Bob')
});
