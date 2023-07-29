function Playlist({ playlist, handleDelete}) {
    return (
        <div className='playlist'>
            {playlist.map(song => (
                <div className='song' key={song.id}>
                    <p>{song.title}, {song.artist}, {song.length}, {song.id}</p>
                    <button onClick={() => handleDelete(song.id)}>delete</button>
                </div>
            ))}
        </div>
    )
}

export default Playlist;