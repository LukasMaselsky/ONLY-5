import { useState, createContext, useReducer} from 'react';
import Playlist from './Playlist';
import Add from './Add';
import ChooseSong from './ChooseSong';
import Customise from './Customise';
import ApplyCustomiseSelect from './ApplyCustomiseSelect';
import ChangeStyle from './ChangeStyle';
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

    function reducer(state, action) {
        switch(action.type) {
            case 'showBGColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: 'flex',
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis
                }
            case 'hideBGColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: 'none',
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis
                }
            case 'setBGColour':
                return {
                    BGColour: action.colour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis
                }
            case 'showFontColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: 'flex', 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis
                }
            case 'hideFontColourPicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: 'none', 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis
                }
            case 'setFontColour':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: action.colour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: state.fontTypePickerVis
                }
            case 'showFontTypePicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: 'flex'
                }
            case 'hideFontTypePicker':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: state.fontType,
                    fontTypePickerVis: 'none'
                }
            case 'setFontType':
                return {
                    BGColour: state.BGColour,
                    BGColourPickerVis: state.BGColourPickerVis,
                    fontColour: state.fontColour, 
                    fontColourPickerVis: state.fontColourPickerVis, 
                    fontType: action.font,
                    fontTypePickerVis: state.fontTypePickerVis
                }

        }
    }

    const [state, dispatch] = useReducer(reducer, {
        BGColour: '#d142f5',
        BGColourPickerVis: 'none',
        fontColour: '#f5ebf7', 
        fontColourPickerVis: 'none', 
        fontType: 'Almarai',
        fontTypePickerVis: 'none'
    })

    const [whichCustomiseOption, setWhichCustomiseOption] = useState('')


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
                hideSelectButtons:setSelectButtonsHide,
                whichCustomiseOption:whichCustomiseOption,
                setWhichCustomiseOption:setWhichCustomiseOption}}>
                    <Add search={search} setSearch={setSearch}/>
                    <Playlist playlist={playlist} updatePlaylist={updatePlaylist} handleDelete={handleDelete} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling} state={state} dispatch={dispatch}/>
                    <ChooseSong playlist={playlist} setPlaylist={setPlaylist} search={search}/>
                    <ApplyCustomiseSelect playlist={playlist} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling} state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen}/>
                    <ChangeStyle state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen}/>
                    <Customise playlist={playlist} state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen} setSelectedForStyling={setSelectedForStyling}/>
            </Visibility.Provider>
        </main>
    );
}

export default App;
