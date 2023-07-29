import { useState } from 'react';
import Playlist from './Playlist';
import Add from './Add';
import './App.css'

function App() {

    const [playlist, setPlaylist] = useState([{
        title:'song1', artist: 'artist1', id: 1, length:3, coverArt:null 
    }, {title:'song2', artist: 'artist2', id: 2, length:4, coverArt:null }])

    const handleDelete = (id) => {
        const newPlaylist = playlist.filter(song => song.id !== id);
        setPlaylist(newPlaylist)
    }

    return (
    <main>
        <Add playlist={playlist} setPlaylist={setPlaylist}/>
        <Playlist playlist={playlist} handleDelete={handleDelete}/>
    </main>
    );
}

export default App;
