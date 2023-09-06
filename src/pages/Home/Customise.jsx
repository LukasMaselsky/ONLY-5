import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Visibility } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { ChromePicker } from 'react-color';
import WebFont from "webfontloader"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//! add message for user not in console
//!! WHY DOES STILL TRIGGER WHEN THERE ISNT ERROR
const handleGoogleFontError = () => {
    console.log('error')
}

function Customise( { playlist, state, dispatch, anyStylerOpen, setAnyStylerOpen, setSelectedForStyling } ) {

    const vis = useContext(Visibility)
    const [fontSearch, setFontSearch] = useState('')

    const searchForGoogleFont = (e) => {
        e.preventDefault()
        const family = e.target.value

        const WebFontConfig = {
            active: dispatch({ type:'setFontType', font:family}),
            inactive: handleGoogleFontError()
        }

        WebFont.load({
            google: {
                families: [family]
            }
        });
    }

    const finishStyling = () => {
        setAnyStylerOpen(false)
        hideAllCustomisers()
    }

    const hideAllCustomisers = () => {
        dispatch({ type:'hideBGColourPicker' })
        dispatch({ type:'hideFontColourPicker' })
        dispatch({ type:'hideFontTypePicker' })
    }

    const showSelectMenu = (payload) => {
        if (playlist.length == 0) {
            alert('no songs added to playlist') //!
        } else {
            let checkboxes = document.querySelectorAll('input[type=checkbox]');
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false
            }

            setSelectedForStyling([]) // deselect all when any button clicked
            vis.showCheckbox()
            vis.showSelectButtons()
            // hide all customiser when clicking a button
            hideAllCustomisers()
            setAnyStylerOpen(false)
            

            vis.setWhichCustomiseOption(payload)
        }
    }

    // this is for colour picker itself
    const handleBGColourChange = (colour) => {
        dispatch({ type: 'setBGColour', colour: colour.rgb})
    }

    const handleFontColourChange = (colour) => {
        dispatch({ type: 'setFontColour', colour: colour.rgb})
    }

    return (
        <>
        <div className="customise">
            <div className="customise-wrapper">
                <div className="select-colour">
                    <button className="select-colour-btn" onClick={() => showSelectMenu('BGColour')}>Background Colour</button>
                    <div style={{display:state.BGColourPickerVis, position:"absolute", bottom:'80px'}}>
                        <ChromePicker 
                        style={{display:state.BGColourPickerVis}}
                        color={state.BGColour}
                        onChangeComplete={handleBGColourChange}
                        />
                    </div>    
                </div>
                <div className="select-font-type">
                    <button className="select-font-type-btn" onClick={() => showSelectMenu('fontType')}>Font Type</button>
                    <div style={{display:state.fontTypePickerVis, color:'black', position:"absolute", bottom:'80px'}}>  
                        <input placeholder='Search for font' value={fontSearch} onInput={e => setFontSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchForGoogleFont(e)}/>
                    </div>
                </div>
                <div className="select-font-colour">
                    <button className="select-font-colour-btn" onClick={() => showSelectMenu('fontColour')}> Font Colour</button>
                    <div style={{display:state.fontColourPickerVis, position:"absolute", bottom:'80px'}}>
                        <ChromePicker 
                        style={{display:state.fontColourPickerVis}}
                        color={state.fontColour}
                        onChangeComplete={handleFontColourChange}
                        />
                    </div>
                </div>
                <div className="upload-background">
                    <button className="upload-background-btn">Upload Background</button>
                </div>
                <div className="close-styler" style={(anyStylerOpen) ? {display:'flex'} : {display:'none'}}>
                    <FontAwesomeIcon className="close-style-btn" icon={faSquareCheck} style={{color: "#86DA98", height:"3rem"}} onClick={() => finishStyling()}/>
                </div>
                <div className="share">
                    <FontAwesomeIcon className='share-btn' icon={faShareFromSquare} style={{height:"2rem"}}/>
                </div>
            </div>
        </div>
        <div style={{width:'100%', height:'500px'}}>

        </div>
        </>
    )
}

export default Customise;