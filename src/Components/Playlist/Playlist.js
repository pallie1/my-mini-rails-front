import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiUrl from "../../apiConfig";
import { DataContext } from "../../App";
import "./Playlist.scss";

const Playlist = () => {
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

  useEffect(() => {
    const allSongsAPICall = async () => {
      try {
        const res = await axios(apiUrl);
        setPlaylist(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    allSongsAPICall();
  }, [refresh, favs, isDeleted]);

  const handleFavs = async (song) => {
    const favsArr = [...displayFavs];
    const included = favsArr.indexOf(song);

    if (included !== -1) {
      setInput({
        name: song.name,
        artist: song.artist,
        duration: song.duration,
        fav: !song.fav,
      });

      favsArr.splice(included, 1);

    } else {
      setInput({
        name: song.name,
        artist: song.artist,
        duration: song.duration,
        fav: !song.fav,
      });

      favsArr.push(song);
    }

    setFavs(favsArr);

    if (input.name !== "") {
      axios({
        url: `${apiUrl}/${song.id}`,
        method: "PUT",
        data: input,
      });
    }
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

  return (
    <>
      <h1>PLAYLIST 1</h1>
      <div>{songs}</div>
    </>
  );
};

export default Playlist;
