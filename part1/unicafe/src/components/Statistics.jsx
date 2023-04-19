import React from "react";
import Button from "./Button";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, setGood, bad, setBad, neutral, setNeutral }) => {
  const all = good + neutral + bad;
  const getAverage = (all) => {
    if (all !== 0) {
      const goodScore = 1;
      const neutralScore = 0;
      const badScore = -1;
      const averageScore =
        (good * goodScore + bad * badScore + neutral * neutralScore) / all;
      return averageScore;
    }
    return 0;
  };
  const average = getAverage(all);
  const getPositive = (all) => {
    if (all !== 0) {
      const positiveScore = (100 * good) / all;
      return `${positiveScore}% `;
    }
    return `0`;
  };
  const positive = getPositive(all);
  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          {all !== 0 ? (
            <>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive} />
            </>
          ) : (
            <tr>
              <td>No feedback given</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
