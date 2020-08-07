import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiUrl from "../../apiConfig";
import { DataContext } from "../../App";
import "./Playlist.scss";

const Playlist = () => {
  //   console.log("apiurl", apiUrl);
  const { refresh, setRefresh } = useContext(DataContext);
  const [playlist, setPlaylist] = useState([]);
  const [favs, setFavs] = useState([]);
  const [input, setInput] = useState({
    name: "",
    artist: "",
    duration: "",
    fav: false,
  });
  const [isDeleted, setIsDeleted] = useState(false);
  const displayFavs = [];
  // const [isFav, setIsFav] = useState(false);

  // console.log('refresh', refresh)

  useEffect(() => {
    const allSongsAPICall = async () => {
      try {
        const res = await axios(apiUrl);
        // console.log(res.data, 'response playlists');
        setPlaylist(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    allSongsAPICall();
  }, [refresh, favs, isDeleted]);

  const handleFavs = async (song) => {
    const favsArr = [...displayFavs];
    // console.log('faves song', song)
    const included = favsArr.indexOf(song);
    console.log("included", included);
    // let input = {title: song.title, artist: song.artist, duration: song.duration, fav: song.fav}

    if (included !== -1) {
      console.log("remove song");
      setInput({
        name: song.name,
        artist: song.artist,
        duration: song.duration,
        fav: !song.fav,
      });
      // let input = {name: song.name, artist: song.artist, duration: song.duration, fav: !song.fav}

      favsArr.splice(included, 1);
    } else {
      console.log("add song to favs");
      setInput({
        name: song.name,
        artist: song.artist,
        duration: song.duration,
        fav: !song.fav,
      });
      // let input = {name: song.name, artist: song.artist, duration: song.duration, fav: !song.fav}
      console.log("set input from add song to favs", input);
      //   console.log('input should say true', input)
      favsArr.push(song);
    }
    // console.log('input', input)
    // console.log('')
    //
    setFavs(favsArr);
    // .then(
    // const apiCall = async () =>

    if (input.name !== "") {
      axios({
        url: `${apiUrl}/${song.id}`,
        method: "PUT",
        data: input,
      });
    }

    console.log("input", input);
    console.log("favsArr", favsArr);
    console.log("input", input);
    console.log("favs", favs);
  };

  const destroy = async (song) => {
    const res = await axios({
      url: `${apiUrl}/${song.id}`,
      method: "DELETE",
    });
    setIsDeleted(!isDeleted);
  };

  const songs = playlist.map((song) => {
    if (song.fav === true) {
      displayFavs.push(song);
    }

    return (
      <div key={song.id}>
        <div className="left-song-data">
          <p>{song.name}</p>
          <div className="right-song-data">
            <p className="inline-name">{song.artist}</p>
            <h2 onClick={() => handleFavs(song)}>{song.fav ? "♥" : "x"}</h2>
            <button onClick={() => destroy(song)}>Delete</button>
          </div>
        </div>
        <p className="left-duration">{song.duration}</p>
      </div>
    );
  });

  const favSongs = displayFavs.map((song) => {
    return (
      <div key={song.id}>
        <div className="left-song-data">
          <p>{song.name}</p>
          <div className="right-song-data">
            <p className="inline-name">{song.artist}</p>
            <h2 onClick={() => handleFavs(song)}>{song.fav ? "♥" : "x"}</h2>
          </div>
        </div>
        <p className="left-duration">{song.duration}</p>
      </div>
    );
  });

  return (
    <>
      <h1>PLAYLIST 1</h1>
      <div>{songs}</div>
      <h2>Favorite Songs List</h2>
      <div>{favSongs}</div>
    </>
  );
};

export default Playlist;
