import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Playlist({ playlist, handleDelete}) {
    return (
        <div className='playlist'>
            <div className="playlist-wrapper">
                {playlist.map(song => (

                    <div className='song' key={song.id}>
                        <div className='song-info'>
                            <div className="song-title">
                                <p>{song.title}</p>
                            </div>
                            <div className="song-artist">
                                <p>{song.artist}</p>
                            </div>
                            
                        </div>
                        <div className='song-length'>
                            <p>{song.length}</p>
                        </div>
                        <div className="trash-wrapper">
                            <FontAwesomeIcon className='trash' icon={faTrash} style={{color: "#ffffff",}} onClick={() => handleDelete(song.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Playlist;