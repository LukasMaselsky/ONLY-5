import { useState, useEffect, useContext, useRef } from "react";
import { Visibility } from "../../App";
import Share from "./Share";
import WebFont from "webfontloader";
import axios from "axios";
import useTogglePopup from "../../hooks/useTogglePopup";
import { Save } from "./Save";
import { CloseStyler } from "./CloseStyler";
import { UploadBackground } from "./UploadBackground";
import { SelectFontColour } from "./SelectFontColour";
import { SelectFontType } from "./SelectFontType";
import { SelectColour } from "./SelectColour";
import { Delete } from "./Delete";
import { SearchBackground } from "./SearchBackground";

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
    const [imageSearch, setImageSearch] = useState("");
    const [imageSearchChoices, setImageSearchChoices] = useState(null);
    const [imageSearchOption, setImageSearchOption] = useState("all");

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

    const searchForImage = () => {
        axios
            .get(
                "https://pixabay.com/api/?key=" +
                    import.meta.env.VITE_PIXABAY_API_KEY +
                    "&q=" +
                    imageSearch +
                    "&orientation=horizontal&image_type=" +
                    imageSearchOption
            )
            .then((response) => {
                console.log(response);
                const images = response["data"]["hits"].slice(0, 10);

                setImageSearchChoices(images.map((i) => i.largeImageURL));
            })
            .catch((err) => {
                console.log(err);
            });
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
                        fontTypePickerVis={state.fontTypePickerVis}
                        listOfAllFonts={listOfAllFonts}
                        fontSearch={fontSearch}
                        setFontSearch={setFontSearch}
                        searchForGoogleFont={searchForGoogleFont}
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
                        imageSearch={imageSearch}
                        setImageSearch={setImageSearch}
                        searchForImage={searchForImage}
                        showSelectMenu={showSelectMenu}
                        imageSearchChoices={imageSearchChoices}
                        dispatch={dispatch}
                        imageSearchOption={imageSearchOption}
                        setImageSearchOption={setImageSearchOption}
                    ></SearchBackground>
                </div>
            </div>
        </>
    );
}

export default Customise;
