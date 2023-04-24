import axios from "axios";

const baseUrl = "https://fullstackopen-backend-ss0y.onrender.com/api/persons";

const createNewPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);

  return request.then((response) => response.data);
};

const deletePerson = (personToDelete) => {
  const request = axios.delete(`${baseUrl}/${personToDelete.id}`);
  return request.then((response) => response.data);
};

const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then((response) => response.data);
};
export default { createNewPerson, deletePerson, updatePerson };
