import { useContext } from "react";
import { Visibility } from "../../App";


function ApplyCustomiseSelect( { setReadyForFileUpload, playlist, selectedForStyling, setSelectedForStyling, state, dispatch, anyStylerOpen, setAnyStylerOpen } ) {

    const vis = useContext(Visibility)

    const finishSelectingForCustomise = () => {
        if (selectedForStyling.length == 0) {
            alert('nothing selected')
        } else {
            if (!(vis.whichCustomiseOption === 'uploadBackground')) {
                setAnyStylerOpen(true)
                // don't trigger greeen checkbox for background upload since you can only click once to upload file
            }

            
            vis.hideCheckbox()
            vis.hideSelectButtons()
            if (vis.whichCustomiseOption === 'BGColour') {
                dispatch({ type:'showBGColourPicker' })
            }
            else if (vis.whichCustomiseOption === 'fontColour') {
                dispatch({ type:'showFontColourPicker' })
            }
            else if (vis.whichCustomiseOption === 'fontType') {
                dispatch({ type:'showFontTypePicker' })
            }
            else if (vis.whichCustomiseOption === 'uploadBackground') {
                dispatch({type:'readyForUpload', status:true})
            }
        } 
    }

    //! for future, improve to check all boxes visually and let user click 'finish selection' for better UX
    const selectAll = () => {
        const allIds = playlist.map(element => element.id)
        setSelectedForStyling(allIds)
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true
        }
    }

    return (
        <div className="customise-select" style={{display:vis.selectButtonsVis}}>
            <div className="customise-select-wrapper">
                <div className="select-all">
                    <button className="select-all-btn" onClick={() => selectAll()}>Select All</button>
                </div>
                <div className="apply-selection">
                    <button className="apply-selection-btn" onClick={() => finishSelectingForCustomise()}>Finish Selection</button>
                </div>
            </div>
        </div>
    )
}

export default ApplyCustomiseSelect;