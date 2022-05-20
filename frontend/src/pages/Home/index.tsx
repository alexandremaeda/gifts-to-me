import React from 'react';
import { Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import { Title } from './styles';

const Home: React.FC = () => (
  <>
    <Header />
    <Container maxWidth="md">
      <Title>Home</Title>
      <Button variant="contained" component={Link} to="/user">
        Usuários
      </Button>
    </Container>
  </>
);

export default Home;
