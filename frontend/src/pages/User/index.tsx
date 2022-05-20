import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const User: React.FC = () => (
  <>
    <Header />
    <Container maxWidth="md">
      <h1>Usuários</h1>
      <Button variant="contained" component={Link} to="/">
        Home
      </Button>
    </Container>
  </>
);

export default User;
