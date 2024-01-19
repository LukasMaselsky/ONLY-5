import { useState, useEffect, useContext, useRef } from "react";
import { VisContext } from "../../context/visContext";
import Share from "./Share";
import useTogglePopup from "../../hooks/useTogglePopup";
import { Save } from "./Save";
import { CloseStyler } from "./CloseStyler";
import { UploadBackground } from "./UploadBackground";
import { SelectFontColour } from "./SelectFontColour";
import { SelectFontType } from "./SelectFontType";
import { SelectColour } from "./SelectColour";
import { Delete } from "./Delete";
import { SearchBackground } from "./SearchBackground";

function Customise({
    playlist,
    state,
    dispatch,
    anyStylerOpen,
    setAnyStylerOpen,
    setSelectedForStyling,
    setIsSaveModalOpen,
}) {
    const vis = useContext(VisContext);

    const fileUploadRef = useRef(null);
    const [isToggled, togglePopup] = useTogglePopup();

    const finishStyling = () => {
        setAnyStylerOpen(false);
        hideAllCustomisers();
    };

    const hideAllCustomisers = () => {
        dispatch({ type: "hideBGColourPicker" });
        dispatch({ type: "hideFontColourPicker" });
        dispatch({ type: "hideFontTypePicker" });
        dispatch({ type: "hideSearchBackgroundPicker" });
    };

    const showSelectMenu = (payload) => {
        if (anyStylerOpen) {
            if (!isToggled) {
                togglePopup(0, 3000, "customise-popup");
            }
        } else {
            // uncheck boxes
            let checkboxes = document.querySelectorAll("input[type=checkbox]");
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }

            setSelectedForStyling([]); // deselect all when any button clicked
            vis.setIsCheckboxVis(true);
            vis.setIsSelectButtonsVis(true);
            // hide all customiser when clicking a button
            hideAllCustomisers();
            setAnyStylerOpen(false);

            dispatch({ type: "readyForUpload", status: false });

            vis.setWhichCustomiseOption(payload);
        }
    };

    // this is for colour picker itself
    const handleBGColourChange = (colour) => {
        dispatch({ type: "setBGColour", colour: colour });
    };

    const handleFontColourChange = (colour) => {
        dispatch({ type: "setFontColour", colour: colour });
    };

    const handleFileUpload = (payload) => {
        showSelectMenu(payload);
    };

    useEffect(() => {
        if (state.readyForUpload) {
            fileUploadRef.current.click(); // click upload file button when finished selection
        }
    }, [state.readyForUpload]);

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        console.log(event.target.files[0]);
        // 👇️ reset file input
        event.target.value = null;
        // 👇️ can still access file object here
        dispatch({ type: "uploadBG", file: fileObj });
    };

    return (
        <>
            <div
                className="customise"
                style={{ display: playlist.length > 0 ? "flex" : "none" }}
            >
                <div className="customise-wrapper">
                    <div className="customise-popup">
                        <p>
                            Finish your current styling by clicking the green
                            check
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <CloseStyler
                            anyStylerOpen={anyStylerOpen}
                            finishStyling={finishStyling}
                        ></CloseStyler>
                        <Delete vis={vis}></Delete>
                        <Save setIsSaveModalOpen={setIsSaveModalOpen}></Save>
                        <Share />
                    </div>
                    <SelectColour
                        state={state}
                        showSelectMenu={showSelectMenu}
                        handleBGColourChange={handleBGColourChange}
                    ></SelectColour>
                    <SelectFontType
                        state={state}
                        dispatch={dispatch}
                        showSelectMenu={showSelectMenu}
                    ></SelectFontType>
                    <SelectFontColour
                        state={state}
                        showSelectMenu={showSelectMenu}
                        handleFontColourChange={handleFontColourChange}
                    ></SelectFontColour>
                    <UploadBackground
                        fileUploadRef={fileUploadRef}
                        handleFileUpload={handleFileUpload}
                        handleFileChange={handleFileChange}
                    ></UploadBackground>
                    <SearchBackground
                        searchBackgroundVis={state.searchBackgroundVis}
                        showSelectMenu={showSelectMenu}
                        dispatch={dispatch}
                    ></SearchBackground>
                </div>
            </div>
        </>
    );
}

export default Customise;
