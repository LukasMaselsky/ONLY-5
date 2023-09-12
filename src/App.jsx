import { useState, createContext, useReducer, useEffect} from 'react';
import Playlist from './components/Playlist';
import Searchbar from './pages/Home/Searchbar';
import ChooseSong from './pages/Home/ChooseSong';
import Customise from './pages/Home/Customise';
import ApplyCustomiseSelect from './pages/Home/ApplyCustomiseSelect';
import Welcome from './pages/Home/Welcome';
import Navbar from './components/Navbar';
import './App.css';


export const Visibility = createContext({popupVis:null, showPopup:null, hidePopup:null, checkboxVis:null, showCheckbox:null, hideCheckbox:null})

function App() {

    const [playlist, setPlaylist] = useState([])

    const [search, setSearch] = useState()
    const [popupVisibility, setPopupVisibility] = useState('hidden')

    const [selectCustomiseVisibility, setSelectCustomiseVisibility] = useState('hidden')
    const [selectButtonsDisplay, setSelectButtonsDisplay] = useState('none')

    const [selectedForStyling, setSelectedForStyling] = useState([])

    const [anyStylerOpen, setAnyStylerOpen] = useState(false)

    const [fullBackground, setFullBackground] = useState(false)

    function reducer(state, action) {
        switch(action.type) {
            case 'showBGColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: 'flex',
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'hideBGColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: 'none',
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'setBGColour':
                return {
                    BGColour: action.colour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'showFontColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: 'flex', 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'hideFontColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: 'none', 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'setFontColour':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: action.colour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'showFontTypePicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: 'flex',
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'hideFontTypePicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: 'none',
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'setFontType':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: action.font,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: state.readyForUpload,
                }
            case 'uploadBG':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: action.file,
                    readyForUpload: state.readyForUpload,
                }
            case 'readyForUpload':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis,
                    uploadBG: state.uploadBG,
                    readyForUpload: action.status,
                }
        }
    }

    const root = document.querySelector(':root')
    const primary = getComputedStyle(root).getPropertyValue("--primary")
    const secondary = getComputedStyle(root).getPropertyValue("--secondary")
    const accent = getComputedStyle(root).getPropertyValue("--accent")
    const background = getComputedStyle(root).getPropertyValue("--background")
    const text = getComputedStyle(root).getPropertyValue("--text")

    const [state, dispatch] = useReducer(reducer, {
        BGColour: background,
        BGColourPickerVis: 'none',
        fontColour: text, 
        fontColourPickerVis: 'none', 
        fontType: 'Almarai',
        fontTypePickerVis: 'none',
        uploadBG: null,
        readyForUpload: false,
    })

    const [whichCustomiseOption, setWhichCustomiseOption] = useState('')


    const updatePlaylist = (update) => {
        setPlaylist(update)
    }

    const handleDelete = (id) => {
        dispatch({ type:'hideBGColourPicker' })
        dispatch({ type:'hideFontColourPicker' })
        dispatch({ type:'hideFontTypePicker' })
        setAnyStylerOpen(false)
        // close all stylers to prevent error where style changes on a deleted element

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

    // ask before reload or leave page
    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    return (
        <>
        <Navbar playlist={playlist}/>
        <main style={{overflow: (playlist.length > 0) ? 'scroll' : 'hidden', 
        minHeight: (playlist.length > 0) ? '90vh' : '100vh'}}>
            <Visibility.Provider value={{
                popupVis:popupVisibility, 
                showPopup:setPopupVisible, 
                hidePopup:setPopupHidden, 
                checkboxVis:selectCustomiseVisibility, 
                showCheckbox:setSelectCustomiseVisible, 
                hideCheckbox:setSelectCustomiseHidden,
                selectButtonsVis:selectButtonsDisplay,
                showSelectButtons:setSelectButtonsShow,
                hideSelectButtons:setSelectButtonsHide,
                whichCustomiseOption:whichCustomiseOption,
                setWhichCustomiseOption:setWhichCustomiseOption}}>
                    <Welcome playlist={playlist}/>
                    <Searchbar search={search} setSearch={setSearch}/>
                    <Playlist fullBackground={fullBackground} playlist={playlist} updatePlaylist={updatePlaylist} handleDelete={handleDelete} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling} state={state} dispatch={dispatch}/>
                    <ChooseSong playlist={playlist} setPlaylist={setPlaylist} search={search}/>
                    <ApplyCustomiseSelect setFullBackground={setFullBackground} playlist={playlist} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling} state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen}/>
                    <Customise playlist={playlist} state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen} setSelectedForStyling={setSelectedForStyling}/>
            </Visibility.Provider>
        </main>
        </>
    );
}

export default App;
