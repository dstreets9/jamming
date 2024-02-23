import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar";
import Tracklist from "../Tracklist";
import Playlist from "../Playlist";
import Login from "../Login";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [clientToken, setClientToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  // GETS USER INPUT
  const userTypingHandler = (e) => {
    setUserInput(e.target.value);
  };

  /* SENDS SEARCH-REQUEST TO API */
  let baseURL = "https://api.spotify.com/v1/search";
  useEffect(() => {
    const fetchData = async () => {
      baseURL += `?q=${encodeURIComponent(userInput)}`;
      baseURL += `&type=track&limit=50`;
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + clientToken,
        },
      });
      const results = await response.json();
      if (response.status === 200) {
        setSearchResults(results.tracks.items);
      } else {
        console.log(response.status);
      }
    };
    if (userInput && clientToken) {
      fetchData();
    }
  }, [userInput]);
  /* GETS CLIENT-TOKEN ON LAUNCH */
  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=17d3d0d3109f4db082e00ef298be2a8a&client_secret=6013aa20e81548eeaf8356ceb270c96c`,
      });
      const data = await response.json();
      if (response.status === 200) {
        setClientToken(data.access_token);
      } else {
        console.log(response.status);
      }
    };
    fetchToken();
  }, []);

  /* GETS USER-TOKEN AFTER LOGIN */
  useEffect(() => {
    const newUrl = window.location.hash.replace("#", "?");
    const access_token = new URLSearchParams(newUrl).get("access_token");
    setUserToken(access_token);
  }, []);
  /* GETS USER INFO */
  let baseUserUrl = "https://api.spotify.com/v1/me";
  useEffect(() => {
    if (userToken) {
      const fetchUserData = async () => {
        const response = await fetch(baseUserUrl, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
          },
        });
        if (response.status === 200) {
          let fullUserInfo = await response.json();
          setUserInfo(fullUserInfo);
        } else {
          console.log(response.status);
        }
      };
      fetchUserData();
    }
  }, [userToken]);

  const trackUris = playlist.map((song) => song.uri);

  // SETS PLAYLIST NAME
  const handlePlaylistType = (e) => {
    setPlaylistName(e.target.value);
  };

  // REMOVES TRACKS FROM PLAYLIST
  const playlistRemover = (songId) => {
    setPlaylist(playlist.filter((playlistSong) => playlistSong.id !== songId));
  };

  // ADDS TRACKS TO PLAYLIST --- PASSED TO TRACKLIST
  const playlistAdder = (selectedSong) => {
    console.log("added");
    const songInPlaylist = playlist
      .map((song) => song.id)
      .find((id) => id === selectedSong.id);
    songInPlaylist
      ? console.log("in there already")
      : setPlaylist([selectedSong, ...playlist]);
  };

  // SUBMITS TRACK-URIS & PLAYLIST NAME TO SPOTIFY
  const handlePlaylistSubmit = async () => {
    if (playlistName && trackUris.length > 0) {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userInfo.display_name}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${playlistName}`,
          }),
        },
      );
      let returnPlaylist = await response.json();
      let playlistReturnId = returnPlaylist.id;
      const addingTracks = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistReturnId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: trackUris,
          }),
        },
      );
      if (addingTracks.status === 201) {
        setPlaylist([]);
      } else {
        console.log(addingTracks.status);
      }
    } else {
      console.log("pls type a name");
    }
  };
  return (
    <div className="App">
      <header className="flex h-[15%] max-h-[15rem] min-h-[10rem] flex-col justify-end p-[1rem] text-center">
        <Login userInfo={userInfo} />
        <h1 className="vast-shadow-regular text-3xl font-bold leading-8 text-white">
          Jamming!
        </h1>
        <SearchBar userTypingHandler={userTypingHandler} />
      </header>
      <main className="flex h-[60%] w-full justify-between p-[5%]">
        <Tracklist
          searchResults={searchResults}
          playlistAdder={playlistAdder}
        />
        {playlist.length > 0 ? (
          <Playlist
            playlistRemover={playlistRemover}
            handlePlaylistSubmit={handlePlaylistSubmit}
            handlePlaylistType={handlePlaylistType}
            playlist={playlist}
            userInfo={userInfo}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
