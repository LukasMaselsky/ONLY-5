import { useContext } from "react";
import { Visibility } from "./App";


function ApplyCustomiseSelect( { playlist, selectedForStyling, setSelectedForStyling } ) {

    const vis = useContext(Visibility)

    const finishSelectingForCustomise = () => {
        vis.hideCheckbox()
        vis.hideSelectButtons()
    }

    //! for future, improve to check all boxes visually and let user click 'finish selection' for better UX
    const selectAll = () => {
        const allIds = playlist.map(element => element.id)
        setSelectedForStyling(allIds)
        vis.hideCheckbox()
        vis.hideSelectButtons()
    }

    return (
        <div className="customise-select" style={{'display':vis.selectButtonsVis}}>
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