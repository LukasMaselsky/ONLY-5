import "./App.css";
import { useState, useReducer, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import Guide from "./pages/Guide/Guide";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
    const [playlist, setPlaylist] = useState([]);

    const [search, setSearch] = useState(null);

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
            case "showSearchBackgroundPicker":
                return {
                    ...state,
                    searchBackgroundVis: "flex",
                };
            case "hideSearchBackgroundPicker":
                return {
                    ...state,
                    searchBackgroundVis: "none",
                };
            case "setSearchBackground":
                return {
                    ...state,
                    searchBG: action.image,
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
        searchBackgroundVis: "none",
        searchBG: null,
    });

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
            element: <Explore />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/guide",
            element: <Guide />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/account",
            element: <Account />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
