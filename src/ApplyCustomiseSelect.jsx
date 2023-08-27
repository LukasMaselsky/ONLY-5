import { useContext } from "react";
import { Visibility } from "./App";


function ApplyCustomiseSelect() {

    const vis = useContext(Visibility)

    return (
        <div className="customise-select" style={{'display':vis.selectButtonsVis}}>
            <div className="customise-select-wrapper">
                <div className="select-all">
                    <button className="select-all-btn">Select All</button>
                </div>
                <div className="apply-selection">
                    <button className="apply-selection-btn">Finish Selection</button>
                </div>
            </div>
        </div>
    )
}

export default ApplyCustomiseSelect;