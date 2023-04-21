const Total = ({ course }) => {
  const initValue = 0;
  const total = course.parts.reduce(
    (total, part) => total + part.exercises,
    initValue
  );
  return <p>Number of exercises {total}</p>;
};

export default Total;
