import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personServices from "../services/Person";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("https://fullstackopen-backend-ss0y.onrender.com/api/persons")
      .then((response) => {
        const newData = response.data;
        setPersons(newData);
      });
  }, []);

  // Adding new persons
  const addNewPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((element) => element.name === newPerson.name)) {
      if (
        confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const oldPerson = persons.find(
          (element) => element.name === newPerson.name
        );
        personServices
          .updatePerson(oldPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
          })
          .catch(() => {
            setError(
              `Information of ${oldPerson.name} has already been removed from server`
            );

            setTimeout(() => {
              setError(null);
            }, 4000);
          });
        setNewNumber("");
        setNewName("");
      } else {
        return;
      }
    } else {
      personServices.createNewPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // Show success message
        setSuccess(`Added ${returnedPerson.name}`);

        //Clean inputs
        setNewNumber("");
        setNewName("");

        // Set timeout
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      });
    }
  };
  ////////

  // controlled components
  const handleNameChange = (e) => {
    const name = e.target.value;

    setNewName(name);
  };
  const handleNumberChange = (e) => {
    const number = e.target.value;

    setNewNumber(number);
  };
  ////

  // Filter person
  const handleFilter = (e) => {
    const search = e.target.value;
    setFilter(search.toLowerCase());
  };

  const searchedPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );
  ////

  // Delete person
  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      // llamada a eliminar un objeto
      personServices.deletePerson(person).then(() => {
        const updatePersons = persons.filter((p) => p.id !== person.id);
        setPersons(updatePersons);
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage error={error} />
      <SuccessMessage success={success} />
      <Filter handleFilter={handleFilter} />
      <h2>Add a new person</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        searchedPerson={searchedPerson}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
