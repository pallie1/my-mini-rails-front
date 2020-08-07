import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiUrl from "../../apiConfig";
import { DataContext } from "../../App";
import "../Playlist/Playlist.scss";

const Favs = () => {
  const { refresh, setRefresh } = useContext(DataContext);
  const [playlist, setPlaylist] = useState([]);
  const [favs, setFavs] = useState([]);
  const [input, setInput] = useState({
    name: "",
    artist: "",
    duration: "",
    fav: false,
  });
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
  }, [refresh, favs]);


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

  const songs = playlist.map((song) => {
    if (song.fav === true) {
      displayFavs.push(song);
    }
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
      <h2>Favorite Songs List</h2>
      <div>{favSongs}</div>
    </>
  );
};

export default Favs;
