import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

function App() {
  const [attendedContacts, setAttendedContacts] = useState([]);
  const [absentContacts, setAbsentContacts] = useState([]);

  const fetchRandomUsers = async (count) => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${count}`
      );
      const data = await response.json();
      return data.results.map((user, index) => ({
        id: index + 1,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.large,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      const attended = await fetchRandomUsers(6);
      const absent = await fetchRandomUsers(4);
      setAttendedContacts(attended);
      setAbsentContacts(absent);
    };

    loadUsers();
  }, []);

  return (
    <AppContainer>
      <ListContainer>
        <Title>Standard List</Title>
        <ContactList attended={attendedContacts} absent={absentContacts} />
      </ListContainer>

      <ListContainer>
        <Title>showEmail=true</Title>
        <ContactList
          attended={attendedContacts}
          absent={absentContacts}
          showEmail={true}
        />
      </ListContainer>
    </AppContainer>
  );
}

export default App;
