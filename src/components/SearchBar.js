import { useState } from "react";

// GETS USER-INPUT
export default function SearchBar({ userTypingHandler }) {
  // RETURNS SEARCHBAR AND PASSES USER-INPUT TO SEARCHRESULTS
  return (
    <input
      type="text"
      onChange={userTypingHandler}
      placeholder="Search for songs on Spotify..."
      className="mx-auto mt-[2%] w-[50%] rounded-3xl bg-white bg-opacity-[.75] p-[1%] text-center text-sm text-black placeholder-black outline-none"
    ></input>
  );
}
