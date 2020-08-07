import React, { useState, createContext } from "react";
import Playlist from "./Components/Playlist/Playlist";
import PostNewSong from "./Components/PostNewSong/PostNewSong";
import "./App.scss";

export const DataContext = createContext();

function App() {
  const [refresh, setRefresh] = useState("");

  return (
    <div className="App">
      <div className='title'>
      <h1>TUNR.</h1>
      <p>FOR ALL YOUR PLAYLIST NEEDS</p>
      </div>
      <DataContext.Provider value={{ refresh, setRefresh }}>
        <Playlist />
        <PostNewSong />
      </DataContext.Provider>
    </div>
  );
}

export default App;
