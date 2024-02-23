export default function Login({ userInfo }) {
  // LOGIN TO SPOTIFY URL
  let baseURL = "https://accounts.spotify.com/authorize";
  const client_id = "17d3d0d3109f4db082e00ef298be2a8a";
  const redirect_uri = "http://localhost:3000";
  const response_type = "token";
  const scope =
    "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-private user-read-email";
  baseURL += `?response_type=${response_type}`;
  baseURL += `&client_id=${encodeURIComponent(client_id)}`;
  baseURL += `&scope=${encodeURIComponent(scope)}`;
  baseURL += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  return (
    <>
      {userInfo ? (
        <a
          href={userInfo.external_urls.spotify}
          className="absolute right-[3rem] top-[1.5rem]"
        >
          <button className="w-full rounded-xl bg-green-600 bg-opacity-[.75] p-[5%] text-[.75rem] text-white">
            {userInfo.display_name}
          </button>
        </a>
      ) : (
        <a href={baseURL} className="absolute right-[1rem] top-[1rem]">
          <button className="w-full rounded-xl bg-green-600 bg-opacity-[.75] p-[5%] text-[.75rem] text-white">
            Login to Spotify
          </button>
        </a>
      )}
    </>
  );
}
