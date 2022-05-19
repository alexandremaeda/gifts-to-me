import api from "./services/api";
import React, { useState, useEffect } from "react";
import "./App.css";

import Container from "@mui/material/Container";
import Header from "./components/Header";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("users").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const handleAddUser = async () => {
    const response = await api.post("users", {
      name: "Alexandre Maeda",
      email: "ale.b.maeda@front",
      password: "123456",
    });

    setUsers([...users, response.data]);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Header title="Home" />
        <List dense>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.email} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          onClick={handleAddUser}
          className="bt-yellow"
        >
          Adicionar Usuário
        </Button>
      </Container>
    </>
  );
}

export default App;
