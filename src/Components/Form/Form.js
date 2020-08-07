import React from "react";
import './Form.scss';

const Form = ({ handleChange, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
      <label>TITLE</label>
      <input
        placeholder=""
        onChange={handleChange}
        name="name"
      />      

      <label>ARTIST</label>
      <input
        placeholder=""
        onChange={handleChange}
        name="artist"
      />

      <label>TIME</label>
      <input
        placeholder=""
        onChange={handleChange}
        name="duration" 
      />
      
      <button>ADD NEW SONG</button>
    </form>
  );
};

export default Form;
