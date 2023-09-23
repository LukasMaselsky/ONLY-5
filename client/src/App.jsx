import { useState, createContext, useReducer, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Explore from "./pages/Explore/Explore";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./App.css";

export const Visibility = createContext({
    isCheckboxVis: null,
    setIsCheckboxVis: null,
    isSelectButtonsVis: null,
    setIsSelectButtonsVis: null,
    whichCustomiseOption: null,
    setWhichCustomiseOption: null,
});

function App() {
    const [playlist, setPlaylist] = useState([]);

    const [search, setSearch] = useState(null);

    const [isCheckboxVis, setIsCheckboxVis] = useState(false);
    const [isSelectButtonsVis, setIsSelectButtonsVis] = useState(false);

    const [selectedForStyling, setSelectedForStyling] = useState([]);

    const [anyStylerOpen, setAnyStylerOpen] = useState(false);

    const [fullBackground, setFullBackground] = useState(false);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const playlistRef = useRef(null);

    function reducer(state, action) {
        switch (action.type) {
            case "showBGColourPicker":
                return {
                    ...state,
                    BGColourPickerVis: "flex",
                };
            case "hideBGColourPicker":
                return {
                    ...state,
                    BGColourPickerVis: "none",
                };
            case "setBGColour":
                return {
                    ...state,
                    BGColour: action.colour,
                };
            case "showFontColourPicker":
                return {
                    ...state,
                    fontColourPickerVis: "flex",
                };
            case "hideFontColourPicker":
                return {
                    ...state,
                    fontColourPickerVis: "none",
                };
            case "setFontColour":
                return {
                    ...state,
                    fontColour: action.colour,
                };
            case "showFontTypePicker":
                return {
                    ...state,
                    fontTypePickerVis: "flex",
                };
            case "hideFontTypePicker":
                return {
                    ...state,
                    fontTypePickerVis: "none",
                };
            case "setFontType":
                return {
                    ...state,
                    fontType: action.font,
                };
            case "uploadBG":
                return {
                    ...state,
                    uploadBG: action.file,
                };
            case "readyForUpload":
                return {
                    ...state,
                    readyForUpload: action.status,
                };
        }
    }

    const root = document.querySelector(":root");
    const primary = getComputedStyle(root).getPropertyValue("--primary");
    const secondary = getComputedStyle(root).getPropertyValue("--secondary");
    const accent = getComputedStyle(root).getPropertyValue("--accent");
    const background = getComputedStyle(root).getPropertyValue("--background");
    const text = getComputedStyle(root).getPropertyValue("--text");

    const [state, dispatch] = useReducer(reducer, {
        BGColour: background,
        BGColourPickerVis: "none",
        fontColour: text,
        fontColourPickerVis: "none",
        fontType: "Almarai",
        fontTypePickerVis: "none",
        uploadBG: null,
        readyForUpload: false,
    });

    const [whichCustomiseOption, setWhichCustomiseOption] = useState("");

    const updatePlaylist = (update) => {
        setPlaylist(update);
    };

    const handleDelete = (id) => {
        dispatch({ type: "hideBGColourPicker" });
        dispatch({ type: "hideFontColourPicker" });
        dispatch({ type: "hideFontTypePicker" });
        setAnyStylerOpen(false);
        // close all stylers to prevent error where style changes on a deleted element

        const newPlaylist = playlist.filter((song) => song.id !== id);
        setPlaylist(newPlaylist);
    };

    // ask before reload or leave page
    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/create",
            element: (
                <Create
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                    updatePlaylist={updatePlaylist}
                    handleDelete={handleDelete}
                    search={search}
                    setSearch={setSearch}
                    fullBackground={fullBackground}
                    setFullBackground={setFullBackground}
                    state={state}
                    dispatch={dispatch}
                    anyStylerOpen={anyStylerOpen}
                    setAnyStylerOpen={setAnyStylerOpen}
                    selectedForStyling={selectedForStyling}
                    setSelectedForStyling={setSelectedForStyling}
                    isSaveModalOpen={isSaveModalOpen}
                    setIsSaveModalOpen={setIsSaveModalOpen}
                    playlistRef={playlistRef}
                />
            ),
        },
        {
            path: "/explore",
            element: <Explore playlist={playlist} />,
        },
    ]);

    return (
        <Visibility.Provider
            value={{
                isCheckboxVis: isCheckboxVis,
                setIsCheckboxVis: setIsCheckboxVis,
                isSelectButtonsVis: isSelectButtonsVis,
                setIsSelectButtonsVis: setIsSelectButtonsVis,
                whichCustomiseOption: whichCustomiseOption,
                setWhichCustomiseOption: setWhichCustomiseOption,
            }}
        >
            <RouterProvider router={router} />
        </Visibility.Provider>
    );
}

export default App;
