const PersonForm = ({
 handleSubmit,
 nameChangeHandler,
 newName,
 newNumber,
 numberChangeHandler,
}) => {
 return (
  <form onSubmit={handleSubmit}>
   <h2>add a new</h2>
   <div>
    name: <input onChange={nameChangeHandler} value={newName} />
   </div>
   <div>
    number: <input onChange={numberChangeHandler} value={newNumber} />
   </div>
   <div>
    <button type='submit'>add</button>
   </div>
  </form>
 );
};

export default PersonForm;
