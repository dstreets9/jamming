import Track from "./Track.js";

export default function Tracklist({ searchResults, playlistAdder }) {
  return (
    <section className="mr-[1%] h-full w-[100%] min-w-[12rem] overflow-hidden">
      <ul className="flex h-[100%] w-full flex-wrap justify-evenly overflow-y-auto">
        {searchResults.map((song) => (
          <Track song={song} handlePlaylistAdd={playlistAdder} />
        ))}
      </ul>
    </section>
  );
}
