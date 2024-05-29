const Filter = ({ searchChangeHandler, newSearch }) => {
 return (
  <div>
   filter shown with <input onChange={searchChangeHandler} value={newSearch} />
  </div>
 );
};

export default Filter;
