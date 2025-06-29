const SongGrid = ({ songs, likedSongs, handleLike, mode, mood }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {songs.map((song) => (
      <div key={song.id || song.name} className="p-4 bg-gray-800 rounded shadow">
        <p className="text-lg font-semibold">{song.name}</p>
        <p className="text-sm text-gray-300">
          {song.artists?.map((a) => a.name).join(", ")}
        </p>
        {song.id && (
          <button
            onClick={() => handleLike(song, mode === "mood" ? mood : null)}
            disabled={likedSongs.includes(song.id)}
            className={`mt-2 px-3 py-1 rounded ${
              likedSongs.includes(song.id)
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {likedSongs.includes(song.id) ? "❤️ Liked" : "💕 Like"}
          </button>
        )}
      </div>
    ))}
  </div>
);

export default SongGrid;