import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleAddContact = async () => {
    try {
      // This is a dummy POST request; it won't persist data on the server
      const response = await axios.post(apiUrl, newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleUpdateContact = async (contactId) => {
    try {
      // This is a dummy PUT request; it won't persist data on the server
      const response = await axios.put(`${apiUrl}/${contactId}`, newContact);
      const updatedContacts = contacts.map((contact) =>
        contact.id === contactId ? response.data : contact
      );
      setContacts(updatedContacts);
      setNewContact({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      // This is a dummy DELETE request; it won't persist data on the server
      await axios.delete(`${apiUrl}/${contactId}`);
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Contact List</h1>
      <div className="add-contact">
        <h2>Add New Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value })
          }
        />
        <button className="add-btn" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
      <div className="contact-list">
        <h2>Contact List</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <div class="contact-info">
                <span class="contact-item">{contact.name}</span>
                <span class="contact-item">{contact.email}</span>
                <span class="contact-item">
                  <a href="tel:{contact.phone}">{contact.phone}</a>
                </span>
              </div>

              <button
                className="update-btn"
                onClick={() => handleUpdateContact(contact.id)}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
