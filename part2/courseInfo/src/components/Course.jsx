const Course = ({ course }) => {
 return (
  <>
   <Header name={course.name} />
   <Content parts={course.parts} />
   <Total parts={course.parts} />
  </>
 );
};

const Header = ({ name }) => {
 return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
 return (
  <div>
   {parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
   ))}
  </div>
 );
};

const Part = (props) => {
 return (
  <p>
   {props.part} {props.exercises}
  </p>
 );
};

const Total = ({ parts }) => {
 const total = parts.reduce((sum, part) => sum + part.exercises, 0);
 return (
  <p>
   <strong>total of {total} exercises</strong>
  </p>
 );
};

export default Course;
