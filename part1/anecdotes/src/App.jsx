import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // step 1 - get the anecdote
  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  // step 2 - vote for current anecdote
  const handleVote = () => {
    const updateVotes = [...votes];
    updateVotes[selected] = updateVotes[selected] + 1;
    setVotes(updateVotes);
  };
  // step 3 - anecdote with most votes
  const firstVoteAnecdote = anecdotes[votes.indexOf(Math.max(...votes))];
  const firstVoteTotal = votes[votes.indexOf(Math.max(...votes))];
  console.log(firstVoteAnecdote);

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button text="Vote" handleClick={handleVote} />
        <Button text="Next Anecdote" handleClick={handleRandom} />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{firstVoteAnecdote}</p>
        <p>{firstVoteTotal} votes</p>
      </div>
    </>
  );
};

export default App;
