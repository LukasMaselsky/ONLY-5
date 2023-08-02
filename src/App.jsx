import { useState, createContext} from 'react';
import Playlist from './Playlist';
import Add from './Add';
import ChooseSong from './ChooseSong';
import './App.css'


export const popupVisibility = createContext({visibility:null, show:null, hide:null})

function App() {

    const [playlist, setPlaylist] = useState([])

    const [search, setSearch] = useState()
    const [visibility, setVisibility] = useState('hidden')

    const handleDelete = (id) => {
        const newPlaylist = playlist.filter(song => song.id !== id);
        setPlaylist(newPlaylist)
    }

    const setVisible = () => {
        setVisibility('visible')
    } 

    const setHidden = () => {
        setVisibility('hidden')
    }

    return (
        <main>
            <popupVisibility.Provider value={{vis:visibility, show:setVisible, hide:setHidden}}>
                <Add search={search} setSearch={setSearch}/>
                <Playlist playlist={playlist} handleDelete={handleDelete}/>
                <ChooseSong playlist={playlist} setPlaylist={setPlaylist} search={search} setSearch={setSearch}/>
            </popupVisibility.Provider>
        </main>
    );
}

export default App;
