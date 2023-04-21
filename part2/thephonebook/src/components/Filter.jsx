import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <form>
      <div>
        filter shown with <input type="text" onChange={handleFilter} />
      </div>
    </form>
  );
};

export default Filter;
