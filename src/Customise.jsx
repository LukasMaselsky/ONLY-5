import { useState, useEffect, useContext } from 'react';
import { Visibility } from "./App";
import { SketchPicker } from 'react-color';

function Customise( { BGColour, setBGColour } ) {

    const vis = useContext(Visibility)

    const showSelectMenu = () => {
        vis.showCheckbox()
        vis.showSelectButtons()
    }


    const handleBGColourChange = (colour) => {
        setBGColour(colour.hex)
    }

    return (
        <div className="customise">
            <div className="customise-wrapper">
                <div className="select-colour">
                    <button className="select-colour-btn" onClick={() => showSelectMenu()}>Background Colour</button>
                </div>
                <SketchPicker 
                color={BGColour}
                onChangeComplete={handleBGColourChange}/>
                <div className="select-font-type">
                    <button className="select-font-type-btn">Font Type</button>
                </div>
                <div className="select-font-colour">
                    <button className="select-font-colour-btn">Font Colour</button>
                </div>
                <div className="upload-background">
                    <button className="upload-background-btn">Upload Background</button>
                </div>
            </div>
        </div>
    )
}

export default Customise;