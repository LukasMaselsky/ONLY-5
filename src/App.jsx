import { useState } from 'react';
import Playlist from './Playlist';
import Add from './Add';
import ChooseSong from './ChooseSong';
import './App.css'

function App() {

    const [playlist, setPlaylist] = useState([{
        title:'song1', artist: 'artist1', id: 1, length:'1:27', coverArt:null 
    }, {title:'song2', artist: 'artist2', id: 2, length:'2:34', coverArt:null }])

    const [search, setSearch] = useState()

    const handleDelete = (id) => {
        const newPlaylist = playlist.filter(song => song.id !== id);
        setPlaylist(newPlaylist)
    }

    return (
    <main>
        <Add search={search} setSearch={setSearch}/>
        <Playlist playlist={playlist} handleDelete={handleDelete}/>
        <ChooseSong playlist={playlist} setPlaylist={setPlaylist} search={search} setSearch={setSearch}/>
    </main>
    );
}

export default App;
