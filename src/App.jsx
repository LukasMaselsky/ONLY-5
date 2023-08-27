import { useState, createContext} from 'react';
import Playlist from './Playlist';
import Add from './Add';
import ChooseSong from './ChooseSong';
import Customise from './Customise';
import ApplyCustomiseSelect from './ApplyCustomiseSelect';
import './App.css';


export const Visibility = createContext({popupVis:null, showPopup:null, hidePopup:null, checkboxVis:null, showCheckbox:null, hideCheckbox:null})

function App() {

    const [playlist, setPlaylist] = useState([])

    const [search, setSearch] = useState()
    const [popupVisibility, setPopupVisibility] = useState('hidden')

    const [selectCustomiseVisibility, setSelectCustomiseVisibility] = useState('hidden')
    const [selectButtonsDisplay, setSelectButtonsDisplay] = useState('none')

    const [selectedForStyling, setSelectedForStyling] = useState([])

    const updatePlaylist = (update) => {
        setPlaylist(update)
    }

    const handleDelete = (id) => {
        const newPlaylist = playlist.filter(song => song.id !== id);
        setPlaylist(newPlaylist)
    }

    const setPopupVisible = () => {
        setPopupVisibility('visible')
    } 

    const setPopupHidden = () => {
        setPopupVisibility('hidden')
    }

    const setSelectCustomiseVisible = () => {
        setSelectCustomiseVisibility('visible')
    }

    const setSelectCustomiseHidden = () => {
        setSelectCustomiseVisibility('hidden')
    }

    const setSelectButtonsShow = () => {
        setSelectButtonsDisplay('flex')
    }

    const setSelectButtonsHide = () => {
        setSelectButtonsDisplay('none')
    }

    return (
        <main>
            <Visibility.Provider value={{
                popupVis:popupVisibility, 
                showPopup:setPopupVisible, 
                hidePopup:setPopupHidden, 
                checkboxVis:selectCustomiseVisibility, 
                showCheckbox:setSelectCustomiseVisible, 
                hideCheckbox:setSelectCustomiseHidden,
                selectButtonsVis:selectButtonsDisplay,
                showSelectButtons:setSelectButtonsShow,
                hideSelectButtons:setSelectButtonsHide}}>
                    <Add search={search} setSearch={setSearch}/>
                    <Playlist playlist={playlist} updatePlaylist={updatePlaylist} handleDelete={handleDelete} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling}/>
                    <ChooseSong playlist={playlist} setPlaylist={setPlaylist} search={search}/>
                    <ApplyCustomiseSelect />
                    <Customise />
            </Visibility.Provider>
        </main>
    );
}

export default App;
