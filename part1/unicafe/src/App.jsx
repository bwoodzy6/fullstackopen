import { useState } from "react";

const Button = ({ handleClick, text }) => {
 return <button onClick={handleClick}>{text}</button>;
};

const SectionHead = ({ text }) => {
 return <h2>{text}</h2>;
};

const StatisticLine = ({ label, value }) => {
 return (
  <>
   <tr>
    <td>{label}</td>
    <td>{value}</td>
   </tr>
  </>
 );
};

const Statistics = ({ stats }) => {
 const all = stats.good.value + stats.neutral.value + stats.bad.value;

 if (all === 0) {
  return <div>No feedback given</div>;
 }

 return (
  <table>
   <tbody>
    <StatisticLine label={stats.good.label} value={stats.good.value} />
    <StatisticLine label={stats.neutral.label} value={stats.neutral.value} />
    <StatisticLine label={stats.bad.label} value={stats.bad.value} />
    <StatisticLine label={"all"} value={all} />
    <StatisticLine
     label={"average"}
     value={calcAverage(stats.good.value, stats.bad.value, all)}
    />
    <StatisticLine
     label={"positive"}
     value={calcPositive(stats.good.value, all) + " %"}
    />
   </tbody>
  </table>
 );
};

const calcAverage = (good, bad, all) => {
 let average = (good - bad) / all;
 if (average < 0 || all < 1) return 0;
 return Number.parseFloat(average.toFixed(2));
};

const calcPositive = (good, all) => {
 if (all < 1) return 0;
 const positive = (good / all) * 100;
 return Number.parseFloat(positive.toFixed(2));
};

const App = () => {
 const [good, setGood] = useState(0);
 const [neutral, setNeutral] = useState(0);
 const [bad, setBad] = useState(0);

 const stats = {
  good: {
   label: "good",
   value: good,
  },
  neutral: {
   label: "neutral",
   value: neutral,
  },
  bad: {
   label: "bad",
   value: bad,
  },
 };

 const clickHandler = (type) => {
  return () => {
   switch (type) {
    case stats.good.label:
     setGood(good + 1);
     break;
    case stats.neutral.label:
     setNeutral(neutral + 1);
     break;
    case stats.bad.label:
     setBad(bad + 1);
     break;
    default:
     break;
   }
  };
 };

 return (
  <div>
   <SectionHead text={"give feedback"} />
   <Button
    handleClick={clickHandler(stats.good.label)}
    text={stats.good.label}
   />
   <Button
    handleClick={clickHandler(stats.neutral.label)}
    text={stats.neutral.label}
   />
   <Button handleClick={clickHandler(stats.bad.label)} text={stats.bad.label} />
   <SectionHead text={"statistics"} />
   <Statistics stats={stats} />
  </div>
 );
};

export default App;
