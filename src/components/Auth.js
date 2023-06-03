import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container className="mt-5">
      <h2>Page de connexion</h2>
      <Form>
        <FormGroup>
          <Label for="username">Nom d'utilisateur:</Label>
          <Input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Mot de passe:</Label>
          <Input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </FormGroup>
        <Link to="/" className="btn btn-primary"></Link>
      </Form>
    </Container>
  );
}

export default LoginPage;
