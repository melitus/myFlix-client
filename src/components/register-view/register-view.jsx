import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './register-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail('Email must be valid');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://popcorns-and-coke.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successfull!')
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error registering the user')
        });
    }
  };

  return (
    <Form>

      <Form.Group controlId="formUsername">
        <Form.Label id="label" >Username:</Form.Label>
        <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label id="label" >Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label id="label" >Email:</Form.Label>
        <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label id="label" >Birthday:</Form.Label>
        <Form.Control type="full-date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

    </Form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};