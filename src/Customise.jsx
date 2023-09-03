import { useState, useEffect, useContext } from 'react';
import { Visibility } from "./App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

function Customise( { playlist, state, dispatch, anyStylerOpen, setAnyStylerOpen, setSelectedForStyling } ) {

    const vis = useContext(Visibility)

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
            dispatch({ type:'hideBGColourPicker' })
            dispatch({ type:'hideFontColourPicker' })
            dispatch({ type:'hideFontTypePicker' })
            

            vis.setWhichCustomiseOption(payload)
        }
    }

    return (
        <div className="customise">
            <div className="customise-wrapper">
                <div className="select-colour">
                    <button className="select-colour-btn" onClick={() => showSelectMenu('BGColour')}>Background Colour</button>
                </div>
                <div className="select-font-type">
                    <button className="select-font-type-btn" onClick={() => showSelectMenu('fontType')}>Font Type</button>
                </div>
                <div className="select-font-colour">
                    <button className="select-font-colour-btn" onClick={() => showSelectMenu('fontColour')}> Font Colour</button>
                </div>
                <div className="upload-background">
                    <button className="upload-background-btn">Upload Background</button>
                </div>
                <div className="close-styler" style={(anyStylerOpen) ? {display:'flex'} : {display:'none'}}>
                    <FontAwesomeIcon className="close-style-btn" icon={faSquareCheck} style={{color: "#86DA98", height:"100%"}}onClick={() => setAnyStylerOpen(!anyStylerOpen)}/>
                </div>
            </div>
        </div>
    )
}

export default Customise;