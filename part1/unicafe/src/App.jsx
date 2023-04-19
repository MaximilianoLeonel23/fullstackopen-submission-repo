import { useState } from "react";
import Statistics from "./components/Statistics";
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <Statistics
      good={good}
      setGood={setGood}
      neutral={neutral}
      setNeutral={setNeutral}
      bad={bad}
      setBad={setBad}
    />
  );
};

export default App;
