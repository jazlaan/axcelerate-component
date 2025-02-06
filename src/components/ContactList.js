import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Modern icons for collapsible headers
import { MdSearch } from "react-icons/md"; // Modern search icon

const Container = styled.div`
  width: 100%;
  max-width: 380px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 90%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const SearchIcon = styled(MdSearch)`
  color: #777;
  font-size: 20px;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  font-size: 16px;
  outline: none;
`;

const SectionHeader = styled.div`
  padding: 12px 16px;
  font-weight: 500;
  font-size: 14px;
  background: #ffffff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  user-select: none;
  border-top: 1px solid #ddd;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: ${(props) =>
    props.selected ? "#f4f1fd" : props.highlight ? "#e8f0fe" : "white"};
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f3f4f6;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #333;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Email = styled.span`
  font-size: 12px;
  color: #777;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ContactList = ({ attended, absent, showEmail }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAttended, setShowAttended] = useState(true);
  const [showAbsent, setShowAbsent] = useState(true);
  const [selectedAttendedUser, setSelectedAttendedUser] = useState(null);
  const [selectedAbsentUser, setSelectedAbsentUser] = useState(null);

  const handleToggleAttended = () => setShowAttended(!showAttended);
  const handleToggleAbsent = () => setShowAbsent(!showAbsent);

  const handleSelectAttendedUser = (contact) => {
    setSelectedAttendedUser(contact.id);
    setSelectedAbsentUser(null);
  };

  const handleSelectAbsentUser = (contact) => {
    setSelectedAbsentUser(contact.id);
    setSelectedAttendedUser(null);
  };

  const filterContacts = (contacts) =>
    contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (showEmail &&
          contact.email &&
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const filteredAttended = filterContacts(attended);
  const filteredAbsent = filterContacts(absent);

  return (
    <Container>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      {filteredAttended.length > 0 && (
        <>
          <SectionHeader onClick={handleToggleAttended}>
            Attended {showAttended ? <FiChevronUp /> : <FiChevronDown />}
          </SectionHeader>
          {showAttended && (
            <List>
              {filteredAttended.map((contact) => (
                <ListItem
                  key={contact.id}
                  onClick={() => handleSelectAttendedUser(contact)}
                  selected={selectedAttendedUser === contact.id}
                  highlight={
                    searchQuery &&
                    contact.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  }
                >
                  <Avatar src={contact.avatar} alt={contact.name} />
                  <Info>
                    <Name>{contact.name}</Name>
                    {showEmail && contact.email && (
                      <Email>{contact.email}</Email>
                    )}
                  </Info>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}

      {filteredAbsent.length > 0 && (
        <>
          <SectionHeader onClick={handleToggleAbsent}>
            Absent {showAbsent ? <FiChevronUp /> : <FiChevronDown />}
          </SectionHeader>
          {showAbsent && (
            <List>
              {filteredAbsent.map((contact) => (
                <ListItem
                  key={contact.id}
                  onClick={() => handleSelectAbsentUser(contact)}
                  selected={selectedAbsentUser === contact.id}
                  highlight={
                    searchQuery &&
                    contact.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  }
                >
                  <Avatar
                    src={contact.avatar || "https://via.placeholder.com/40"}
                    alt={contact.name}
                  />
                  <Info>
                    <Name>{contact.name}</Name>
                    {showEmail && contact.email && (
                      <Email>{contact.email}</Email>
                    )}
                  </Info>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}

      {filteredAttended.length === 0 && filteredAbsent.length === 0 && (
        <p style={{ textAlign: "center", padding: "20px", color: "#777" }}>
          No results found
        </p>
      )}
    </Container>
  );
};

ContactList.propTypes = {
  attended: PropTypes.array.isRequired,
  absent: PropTypes.array.isRequired,
  showEmail: PropTypes.bool,
};

ContactList.defaultProps = {
  showEmail: true,
};

export default ContactList;
