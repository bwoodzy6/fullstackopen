import { useState } from "react";

const Anecdote = ({ anecdotes, selected, votes }) => {
 let totalVotes = 0;
 if (votes[selected] > 0) {
  totalVotes = votes[selected];
 }
 return (
  <>
   <p>{anecdotes[selected]}</p>
   <p>has {totalVotes} votes</p>
  </>
 );
};

const Button = ({ handleClick, text }) => {
 return <button onClick={handleClick}>{text}</button>;
};

const SectionHead = ({ text }) => {
 return <h2>{text}</h2>;
};

const AnecdoteOfDay = ({ anecdotes, selected, votes }) => {
 return (
  <>
   <SectionHead text={"Anecdote of the day"} />
   <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
  </>
 );
};

const AnecdoteMostVost = ({ anecdotes, votes }) => {
 if (Object.keys(votes).length === 0) return <></>;
 const keyWithMost = getMostVotesKey(votes);

 return (
  <>
   <SectionHead text={"Anecdote with most votes"} />
   <Anecdote anecdotes={anecdotes} selected={keyWithMost} votes={votes} />
  </>
 );
};

const getMostVotesKey = (votes) => {
 let most = 0;
 let keyWithMost = 0;

 for (let v in votes) {
  if (votes[v] > most) {
   keyWithMost = v;
   most = votes[v];
  }
 }
 return keyWithMost;
};

const App = () => {
 const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
 ];

 const [selected, setSelected] = useState(0);
 const [votes, setVotes] = useState({});

 const handleClick = () => {
  const rand = Math.floor(Math.random() * anecdotes.length);
  console.log("rand:", rand);
  setSelected(rand);
 };

 const handleVoteClick = () => {
  const copy = { ...votes };
  console.log(copy);
  copy[selected] = copy[selected] ? copy[selected] + 1 : 1;
  setVotes(copy);
 };

 return (
  <div>
   <AnecdoteOfDay anecdotes={anecdotes} selected={selected} votes={votes} />
   <Button handleClick={handleVoteClick} text='vote' />
   <Button handleClick={handleClick} text='next anecdote' />
   <AnecdoteMostVost anecdotes={anecdotes} votes={votes} />
  </div>
 );
};

export default App;
