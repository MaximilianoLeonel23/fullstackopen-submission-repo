import React from "react";

const SuccessMessage = ({ success }) => {
  if (success === null) {
    return null;
  }
  return <div className="success">{success}</div>;
};

export default SuccessMessage;
