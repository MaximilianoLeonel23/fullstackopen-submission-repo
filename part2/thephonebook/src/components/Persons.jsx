import React from "react";

const Persons = ({ searchedPerson, persons, handleDelete }) => {
  return (
    <>
      {searchedPerson
        ? searchedPerson.map((person) => {
            return (
              <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person)}>Delete</button>
              </p>
            );
          })
        : persons.map((person) => {
            return (
              <p key={person.name}>
                {person.name} {person.number}
                <button>Delete</button>
              </p>
            );
          })}
    </>
  );
};

export default Persons;
