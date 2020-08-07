import React, { useState, useContext } from "react";
import axios from "axios";
import apiUrl from "../../apiConfig";
import Form from "../Form/Form";
import { DataContext } from "../../App";

const PostNewSong = () => {
  const { refresh, setRefresh } = useContext(DataContext);
  const [input, setInput] = useState({ name: "", artisit: "", duration: "" });
  

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target,'event')

    axios({
      url: apiUrl,
      method: "POST",
      data: input
    })
    .then(
      setRefresh(event.target)
    )
    .catch(console.error);

    event.target.reset();
  };

  return (
    <div>
      <h1>ADD A NEW SONG</h1>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PostNewSong;
