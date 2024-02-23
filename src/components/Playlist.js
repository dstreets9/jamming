export default function Playlist({
  handlePlaylistSubmit,
  handlePlaylistType,
  playlistRemover,
  playlist,
  userInfo,
}) {
  return (
    <section className="h-full w-[25%] min-w-[10rem] max-w-[15rem] overflow-hidden rounded-xl bg-white bg-opacity-[.25]">
      <div className="flex h-[5%] max-h-[8rem] min-h-[2rem] items-center justify-around">
        <input
          onChange={handlePlaylistType}
          placeholder="Enter playlist name..."
          type="text"
          className="w-[75%] rounded-3xl bg-white bg-opacity-[.75] p-[2%] text-center text-xs text-black placeholder-black outline-none"
        ></input>

        <img
          onClick={handlePlaylistSubmit}
          src="../assets/checkmark.svg"
          className="w-[10%] hover:w-[15%]"
        ></img>
      </div>
      <ul className="h-[90%] w-full overflow-y-scroll p-[.5rem]">
        {playlist.map((song) => (
          <li
            key={song.id}
            className="mb-2 flex w-full whitespace-nowrap rounded-xl bg-[rgba(0,0,0,.75)] p-[5%] text-white"
          >
            <div className="relative w-full overflow-hidden">
              <h2 className="font-serif text-sm font-bold">{song.name}</h2>
              <h3 className="font-sans text-xs font-semibold opacity-[.5]">
                {song.artists[0].name}
              </h3>
              <button
                onClick={() => playlistRemover(song.id)}
                className="absolute bottom-0 right-0 flex h-[100%] text-5xl text-red-600"
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
