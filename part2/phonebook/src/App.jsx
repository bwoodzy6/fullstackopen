import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Notification from "./components/Notification";

import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  //  const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "918-333-5555" },
  //  ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow = newSearch.length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    : persons;

  const handleSubmit = (event) => {
    event.preventDefault();

    const doesNameExist = (person) => person.name === newName;

    if (persons.findIndex(doesNameExist) > -1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = persons.find((person) => person.name === newName);
        updatedPerson.number = newNumber;
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            console.log("replacing number for", returnedPerson.name);
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            triggerNotification(
              `Updated number for ${returnedPerson.name} to ${returnedPerson.number}`
            );
          })
          .catch((error) => {
            setIsError(true);
            triggerNotification(
              `Information of ${updatedPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
            console.log("update error", error);
          });
        // personService.update(id, newObject)
      }
      setNewName("");
      setNewNumber("");
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      triggerNotification(`Added ${returnedPerson.name}`);
    });
  };

  const triggerNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
      setIsError(false);
    }, 5000);
  };

  const searchChangeHandler = (event) => {
    setNewSearch(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePerson = (id) => {
    const deletePerson = persons.filter((person) => person.id === id)[0];
    console.log("deletePerson", deletePerson);
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
        console.log(`Deleted ${returnedPerson.name}`);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter searchChangeHandler={searchChangeHandler} newSearch={newSearch} />
      <PersonForm
        handleSubmit={handleSubmit}
        nameChangeHandler={nameChangeHandler}
        numberChangeHandler={numberChangeHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
