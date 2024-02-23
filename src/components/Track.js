export default function Track({ song, handlePlaylistAdd }) {
  console.log(song);
  return (
    <li
      key={song.id}
      className="relative m-[.25rem] w-[25%] min-w-[5rem] max-w-[10rem] overflow-hidden whitespace-nowrap rounded-xl bg-white bg-opacity-[50%] pb-[3%] text-black"
    >
      <img src={song.album.images[0].url}></img>
      <h2 className="lg:text-md font-serif text-xs font-bold md:text-sm">
        {song.name}
      </h2>
      <h3 className="lg:text-md font-sans text-xs font-semibold md:text-sm">
        {song.artists[0].name}
      </h3>
      <button
        onClick={() => handlePlaylistAdd(song)}
        className="absolute right-0 top-0 flex h-[20%] w-[20%] items-center justify-center bg-white bg-opacity-[.75] text-2xl text-green-600"
      >
        <p>+</p>
      </button>
    </li>
  );
}
