import React, { useState, createContext } from "react";
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import Favs from './Components/Favs/Favs';
import Playlist from "./Components/Playlist/Playlist";
import PostNewSong from "./Components/PostNewSong/PostNewSong";
import "./App.scss";

export const DataContext = createContext();

function App() {
  const [refresh, setRefresh] = useState("");

  return (
    <div>
      <div className='title'>
      <Link to='/'>
        <h1>TUNR.</h1>
      </Link>
      <p>FOR ALL YOUR PLAYLIST NEEDS</p>
      <Link to='/favorites'>Favorites</Link>
      </div>
      <Switch>
      <DataContext.Provider value={{ refresh, setRefresh }}>
        <Route exact path='/' component={Playlist} />
        <Route exact path='/favorites' component={Favs} />
        <PostNewSong />
      </DataContext.Provider>
      </Switch>
    </div>
  );
}

export default withRouter(App);
