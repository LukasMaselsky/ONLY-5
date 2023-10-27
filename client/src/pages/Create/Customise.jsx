import { useState, useEffect, useContext, useRef } from "react";
import { Visibility } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";
import WebFont from "webfontloader";
import axios from "axios";
import useTogglePopup from "../../hooks/useTogglePopup";

//! add message for user not in console
//!! WHY DOES STILL TRIGGER WHEN THERE ISNT ERROR
const handleGoogleFontError = () => {
    console.log("error");
};

function Customise({
    playlist,
    state,
    dispatch,
    anyStylerOpen,
    setAnyStylerOpen,
    setSelectedForStyling,
    setIsSaveModalOpen,
}) {
    var [listOfAllFonts, setListOfAllFonts] = useState(null);
    const vis = useContext(Visibility);
    const [fontSearch, setFontSearch] = useState("");
    const fileUploadRef = useRef(null);
    const [isToggled, togglePopup] = useTogglePopup();

    const searchForGoogleFont = (family) => {
        const WebFontConfig = {
            active: dispatch({ type: "setFontType", font: family }),
            inactive: handleGoogleFontError(),
        };

        WebFont.load({
            google: {
                families: [family],
            },
        });
    };

    useEffect(() => {
        if (state.fontTypePickerVis == "flex" && listOfAllFonts == null) {
            // fetch list of all fonts when font search bar appears for the first time
            axios
                .get(
                    "https://www.googleapis.com/webfonts/v1/webfonts?key=" +
                        import.meta.env.VITE_GOOGLE_FONTS_API_KEY
                )
                .then((response) => {
                    setListOfAllFonts(response.data.items); // array
                    console.log(listOfAllFonts);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [state.fontTypePickerVis]);

    const finishStyling = () => {
        setAnyStylerOpen(false);
        hideAllCustomisers();
    };

    const hideAllCustomisers = () => {
        dispatch({ type: "hideBGColourPicker" });
        dispatch({ type: "hideFontColourPicker" });
        dispatch({ type: "hideFontTypePicker" });
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
        dispatch({ type: "setBGColour", colour: colour.rgb });
    };

    const handleFontColourChange = (colour) => {
        dispatch({ type: "setFontColour", colour: colour.rgb });
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
                    <div className="select-colour">
                        <button
                            className="select-colour-btn"
                            onClick={() => showSelectMenu("BGColour")}
                        >
                            Background Colour
                        </button>
                        <div
                            className="background-colour-picker"
                            style={{ display: state.BGColourPickerVis }}
                        >
                            <ChromePicker
                                style={{ display: state.BGColourPickerVis }}
                                color={state.BGColour}
                                onChangeComplete={handleBGColourChange}
                            />
                        </div>
                    </div>
                    <div className="select-font-type">
                        <button
                            className="select-font-type-btn"
                            onClick={() => showSelectMenu("fontType")}
                        >
                            Font Type
                        </button>
                        <div
                            className="font-searcher-wrapper"
                            style={{ display: state.fontTypePickerVis }}
                        >
                            <div className="font-searcher">
                                <input
                                    placeholder="Search for a Google font"
                                    value={fontSearch}
                                    onInput={(e) =>
                                        setFontSearch(e.target.value)
                                    }
                                />
                            </div>
                            <div className="font-list">
                                {listOfAllFonts &&
                                    listOfAllFonts
                                        .filter((name) =>
                                            name.family
                                                .toLowerCase()
                                                .includes(
                                                    fontSearch.toLowerCase()
                                                )
                                        )
                                        .map((font, index) => (
                                            <div
                                                key={index}
                                                className="font"
                                                onClick={() =>
                                                    searchForGoogleFont(
                                                        font.family
                                                    )
                                                }
                                            >
                                                {font.family}
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                    <div className="select-font-colour">
                        <button
                            className="select-font-colour-btn"
                            onClick={() => showSelectMenu("fontColour")}
                        >
                            {" "}
                            Font Colour
                        </button>
                        <div
                            className="font-colour-picker"
                            style={{ display: state.fontColourPickerVis }}
                        >
                            <ChromePicker
                                style={{ display: state.fontColourPickerVis }}
                                color={state.fontColour}
                                onChangeComplete={handleFontColourChange}
                            />
                        </div>
                    </div>
                    <div className="upload-background">
                        <button
                            className="upload-background-btn"
                            onClick={() => handleFileUpload("uploadBackground")}
                        >
                            Upload Background
                        </button>
                        <input
                            ref={fileUploadRef}
                            onChange={handleFileChange}
                            type="file"
                            accept="image/*"
                            className="file-upload"
                        ></input>
                    </div>
                    <div
                        className="close-styler"
                        style={
                            anyStylerOpen
                                ? { display: "flex" }
                                : { display: "none" }
                        }
                    >
                        <FontAwesomeIcon
                            className="close-style-btn"
                            icon={faSquareCheck}
                            style={{ color: "#86DA98", height: "3rem" }}
                            onClick={() => finishStyling()}
                        />
                    </div>
                    <div className="save">
                        <FontAwesomeIcon
                            className="save-btn"
                            icon={faFloppyDisk}
                            style={{ height: "2rem" }}
                            onClick={() => setIsSaveModalOpen(true)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customise;
