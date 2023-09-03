import { ChromePicker } from 'react-color';
import FontPicker from "font-picker-react";

function ChangeStyle( { state, dispatch, anyStylerOpen } ) {

    // this is for colour picker itself
    const handleBGColourChange = (colour) => {
        dispatch({ type: 'setBGColour', colour: colour.rgb})
    }

    const handleFontColourChange = (colour) => {
        dispatch({ type: 'setFontColour', colour: colour.rgb})
    }

    //const API_KEY = process.env.GOOGLE_FONTS_API_KEY

    return (
        <div className='change-style' style={ (anyStylerOpen) ? {display:'flex'} : {display:'none'} }>
            <div className="change-style-wrapper">
                <div style={{display:state.BGColourPickerVis}}>
                    <ChromePicker 
                    style={{display:state.BGColourPickerVis}}
                    color={state.BGColour}
                    onChangeComplete={handleBGColourChange}/>
                </div>
                <div style={{display:state.fontColourPickerVis}}>
                    <ChromePicker 
                    style={{display:state.fontColourPickerVis}}
                    color={state.fontColour}
                    onChangeComplete={handleFontColourChange}/>
                </div>
                <div style={{display:state.fontTypePickerVis, color:'black'}}>
                    <FontPicker 
                    apiKey='AIzaSyDn-RNX3Mcqu1kOa93wSdYmRMpWwEaa0EY'
                    activeFontFamily={state.fontType}
                    onChange={(nextFont) => dispatch({type:'setFontType', font:nextFont.family})}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChangeStyle;