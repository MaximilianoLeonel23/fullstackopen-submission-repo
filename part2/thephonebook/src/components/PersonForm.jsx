import React from "react";

const PersonForm = ({
  addNewPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        number:{" "}
        <input
          type="tel"
          value={newNumber}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
