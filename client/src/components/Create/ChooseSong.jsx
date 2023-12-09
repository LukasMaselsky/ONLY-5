import { useState, useEffect, useContext, useRef } from "react";
import { Visibility } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faRotate } from "@fortawesome/free-solid-svg-icons";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import ChooseSongList from "./ChooseSongList";

function ChooseSong({ playlist, setPlaylist, search, setSearch }) {
    const [selection, setSelection] = useState(null);
    const vis = useContext(Visibility);
    const [isChoosing, setIsChoosing] = useState(false); //* var to know if song is being chosen to prevent spamming of search button
    const [isLoading, setIsLoading] = useState(false);
    const [failedLoadSongs, setFailedLoadSongs] = useState(false);

    const [offsetCounter, setOffsetCounter] = useState(5);
    const [previousSearch, setPreviousSearch] = useState("");

    const spotify = {
        ClientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        ClientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    };

    const callSongs = (offset) => {
        const searchTerm = offset == 0 ? search : previousSearch; // if offset isn't 0 then load more was pressed

        setIsChoosing(true);
        setIsLoading(true);

        axios("https://accounts.spotify.com/api/token", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    btoa(spotify.ClientId + ":" + spotify.ClientSecret),
            },
            data: "grant_type=client_credentials",
            method: "POST",
        })
            .then((tokenResponse) => {
                axios(
                    "https://api.spotify.com/v1/search?q=" +
                        searchTerm +
                        "&type=track&market=ES&limit=5&offset=" +
                        String(offset),
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                "Bearer " + tokenResponse.data.access_token,
                        },
                    }
                )
                    .then((response) => {
                        if (offset == 0) {
                            setPreviousSearch(search); // save search term for if user presses load more
                        }
                        setSearch(null); // prevents choose song api call firing if leaving page and coming back
                        //console.log(response)
                        let data = response["data"]["tracks"]["items"];
                        data.sort((a, b) => b.popularity - a.popularity); //* sort by highest popularity
                        setSelection(data);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setFailedLoadSongs(true);
                    });
            })
            .catch((err) => {
                setFailedLoadSongs(true);
            });
    };

    useEffect(() => {
        if (search === "") return;

        //! this if statement to prevent firing on initialization of search when it is null
        if (search != null && !isChoosing && playlist.length < 5) {
            setOffsetCounter(5); // set offset to default on each new search
            callSongs(0);
        }
    }, [search]);

    const exitChoosing = () => {
        setIsChoosing(false);
        setIsLoading(false);
    };

    const modalRef = useRef(null);

    useEffect(() => {
        if (isChoosing) {
            modalRef.current.showModal();
            modalRef.current.style.display = "flex";
        } else {
            modalRef.current.close();
            modalRef.current.style.display = "none"; // weird hack cause flex in css sheet causes modal to not dissapear
        }
    }, [isChoosing]);

    // detect esc pressed to exit
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode == 27) {
                modalRef.current.close();
                setIsChoosing(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [failedLoadSongs]);

    return (
        <dialog ref={modalRef} className="choose-song">
            <FontAwesomeIcon
                className="exit"
                icon={faX}
                onClick={exitChoosing}
            />
            <ScaleLoader
                color={getComputedStyle(
                    document.querySelector(":root")
                ).getPropertyValue("--background")}
                loading={isLoading}
                height={75}
                width={8}
                radius={4}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            {failedLoadSongs ? (
                <FailedChooseSongList exitChoosing={exitChoosing} />
            ) : (
                <ChooseSongList
                    setPlaylist={setPlaylist}
                    setIsChoosing={setIsChoosing}
                    callSongs={callSongs}
                    setOffsetCounter={setOffsetCounter}
                    offsetCounter={offsetCounter}
                    isLoading={isLoading}
                    selection={selection}
                    playlist={playlist}
                />
            )}
        </dialog>
    );
}

export default ChooseSong;

function FailedChooseSongList({ exitChoosing }) {
    const root = document.querySelector(":root");
    const secondary = getComputedStyle(root).getPropertyValue("--secondary");

    return (
        <div className="choose-song-failed-load">
            <FontAwesomeIcon
                icon={faRotate}
                style={{ color: secondary, fontSize: "5rem" }}
            />
            <p>The songs failed to load.</p>
            <p>Check your internet connection and try again.</p>
            <button onClick={exitChoosing}>OK</button>
        </div>
    );
}
