import { useContext, useState } from "react";
import { Visibility } from "../../App";
import useTogglePopup from "../../hooks/useTogglePopup";

function ApplyCustomiseSelect({
    setFullBackground,
    playlist,
    selectedForStyling,
    setSelectedForStyling,
    state,
    dispatch,
    anyStylerOpen,
    setAnyStylerOpen,
}) {
    const vis = useContext(Visibility);
    const [isToggled, togglePopup] = useTogglePopup();

    const finishSelectingForCustomise = () => {
        if (selectedForStyling.length == 0) {
            togglePopup(0, 3000, "select-popup");
        } else {
            if (!(vis.whichCustomiseOption === "uploadBackground")) {
                setAnyStylerOpen(true);
                // don't trigger greeen checkbox for background upload since you can only click once to upload file
            }

            vis.setIsCheckboxVis(false);
            vis.setIsSelectButtonsVis(false);
            if (vis.whichCustomiseOption === "BGColour") {
                dispatch({ type: "showBGColourPicker" });
            } else if (vis.whichCustomiseOption === "fontColour") {
                dispatch({ type: "showFontColourPicker" });
            } else if (vis.whichCustomiseOption === "fontType") {
                dispatch({ type: "showFontTypePicker" });
            } else if (vis.whichCustomiseOption === "uploadBackground") {
                setFullBackground(false);
                dispatch({ type: "readyForUpload", status: true });
            }
        }
    };

    const selectAll = () => {
        const allIds = playlist.map((element) => element.id);
        setSelectedForStyling(allIds);
        let checkboxes = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    };

    const selectFullBackgroundImage = () => {
        vis.setIsCheckboxVis(false);
        vis.setIsSelectButtonsVis(false);
        setFullBackground(true);
        dispatch({ type: "readyForUpload", status: true });
    };

    const cancel = () => {
        setAnyStylerOpen(false);
        dispatch({ type: "hideBGColourPicker" });
        dispatch({ type: "hideFontColourPicker" });
        dispatch({ type: "hideFontTypePicker" });
        vis.setIsCheckboxVis(false);
        vis.setIsSelectButtonsVis(false);
    };

    return (
        <div
            className="customise-select"
            style={{ display: vis.isSelectButtonsVis ? "flex" : "none" }}
        >
            <div className="customise-select-wrapper">
                <div className="select-popup">
                    <p>Nothing selected</p>
                </div>
                <div className="cancel">
                    <button className="cancel-btn" onClick={() => cancel()}>
                        Cancel
                    </button>
                </div>
                <div className="select-all">
                    <button
                        className="select-all-btn"
                        onClick={() => selectAll()}
                    >
                        Select All
                    </button>
                </div>
                <div
                    className="full-background-image"
                    style={{
                        display:
                            vis.whichCustomiseOption === "uploadBackground"
                                ? "inline"
                                : "none",
                    }}
                >
                    <button
                        className="full-background-image-btn"
                        onClick={() => selectFullBackgroundImage()}
                    >
                        Full Background
                    </button>
                </div>
                <div className="apply-selection">
                    <button
                        className="apply-selection-btn"
                        onClick={() => finishSelectingForCustomise()}
                    >
                        Finish Selection
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyCustomiseSelect;
