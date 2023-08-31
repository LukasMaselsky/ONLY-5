import { useState, useEffect, useContext } from 'react';
import { Visibility } from "./App";

function Customise( { playlist, state, dispatch } ) {

    const vis = useContext(Visibility)

    const showSelectMenu = (payload) => {
        if (playlist.length == 0) {
            alert('no songs added to playlist')
        } else {
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
            </div>
        </div>
    )
}

export default Customise;