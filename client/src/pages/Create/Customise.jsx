import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Visibility } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
    const fileUploadRef = useRef(null)

    const searchForGoogleFont = (family) => {
        const WebFontConfig = {
            active: dispatch({ type:'setFontType', font:family}),
            inactive: handleGoogleFontError(),
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
        } 
        else if (anyStylerOpen) {
            alert('finish your current styling by clicking the green button')
        }
        else {
            let checkboxes = document.querySelectorAll('input[type=checkbox]');
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false
            }

            setSelectedForStyling([]) // deselect all when any button clicked
            vis.setIsCheckboxVis(true)
            vis.setIsSelectButtonsVis(true)
            // hide all customiser when clicking a button
            hideAllCustomisers()
            setAnyStylerOpen(false)

            dispatch({type:'readyForUpload', status:false})

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

    const handleFileUpload = (payload) => {
        showSelectMenu(payload)
    }

    useEffect(() => {
        if (state.readyForUpload) {
            fileUploadRef.current.click() // click upload file button when finished selection
        }
    }, [state.readyForUpload])

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }
        // 👇️ reset file input
        event.target.value = null;

        // 👇️ can still access file object here
        dispatch({type:'uploadBG', file: fileObj})
    }

    return (
        <>
        <div className="customise" style={{display:(playlist.length > 0) ? 'flex' : 'none'}}>
            <div className="customise-wrapper">
                <div className="select-colour">
                    <button className="select-colour-btn" onClick={() => showSelectMenu('BGColour')}>Background Colour</button>
                    <div className='background-colour-picker' style={{display:state.BGColourPickerVis}}>
                        <ChromePicker 
                        style={{display:state.BGColourPickerVis}}
                        color={state.BGColour}
                        onChangeComplete={handleBGColourChange}
                        />
                    </div>    
                </div>
                <div className="select-font-type">
                    <button className="select-font-type-btn" onClick={() => showSelectMenu('fontType')}>Font Type</button>
                    <div className='font-searcher' style={{display:state.fontTypePickerVis}}>  
                        <input placeholder='Search for font' value={fontSearch} onInput={e => setFontSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchForGoogleFont(fontSearch)}/>
                        <FontAwesomeIcon className='search-button' icon={faMagnifyingGlass} style={{color: "black",}} onClick={() => searchForGoogleFont(fontSearch)}/>
                    </div>
                </div>
                <div className="select-font-colour">
                    <button className="select-font-colour-btn" onClick={() => showSelectMenu('fontColour')}> Font Colour</button>
                    <div className='font-colour-picker' style={{display:state.fontColourPickerVis}}>
                        <ChromePicker 
                        style={{display:state.fontColourPickerVis}}
                        color={state.fontColour}
                        onChangeComplete={handleFontColourChange}
                        />
                    </div>
                </div>
                <div className="upload-background">
                    <button className="upload-background-btn" onClick={() => handleFileUpload('uploadBackground')}>Upload Background</button>
                    <input ref={fileUploadRef} onChange={handleFileChange} type='file' className='file-upload'></input>
                </div>
                <div className="close-styler" style={(anyStylerOpen) ? {display:'flex'} : {display:'none'}}>
                    <FontAwesomeIcon className="close-style-btn" icon={faSquareCheck} style={{color: "#86DA98", height:"3rem"}} onClick={() => finishStyling()}/>
                </div>
                <div className="save">
                    <FontAwesomeIcon className='save-btn' icon={faFloppyDisk} style={{height:"2rem"}}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Customise;