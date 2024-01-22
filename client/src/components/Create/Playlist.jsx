import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { VisContext } from "../../context/visContext";
import Explicit from "./Explicit";

function setTrashColour() {
    //! might be broken with gradient
    const songs =
        document.getElementsByClassName("playlist-wrapper")[0].childNodes;

    for (let j = 0; j < songs.length; j++) {
        const background = songs[j].style.backgroundColor;
        let rgb = background.match(/[.?\d]+/g);

        if (rgb === null) return;

        const brightness = Math.round(
            (parseInt(rgb[0]) * 299 +
                parseInt(rgb[1]) * 587 +
                parseInt(rgb[2]) * 114) /
                1000
        );
        const textColour = brightness > 125 ? "black" : "white";
        const trash = document.getElementsByClassName("trash")[j];
        trash.style.color = textColour;
    }
}

function Playlist({
    playlistRef,
    fullBackground,
    playlist,
    updatePlaylist,
    handleDelete,
    selectedForStyling,
    setSelectedForStyling,
    state,
    dispatch,
}) {
    const vis = useContext(VisContext);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(playlist);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updatePlaylist(items);
    }

    //* works now
    const handleCheckboxChange = (event, id) => {
        if (selectedForStyling.includes(id)) {
            const newSelected = selectedForStyling.filter((e) => e !== id);
            setSelectedForStyling(newSelected);
        } else {
            setSelectedForStyling((prev) => [...prev, id]);
        }
    };

    // change BG colour on each song selected
    useEffect(() => {
        // clear full img bg
        const wrapper = document.getElementsByClassName("playlist-wrapper")[0];
        wrapper.style.backgroundImage = "none";

        for (let i = 0; i < selectedForStyling.length; i++) {
            const id = "song-" + String(selectedForStyling[i]);
            const element = document.getElementById(id);

            element.style.backgroundImage = "none"; //* CLEAR BG IMAGE IF STYLING BG COLOUR
            element.style.background = state.BGColour;
        }
        setTrashColour(); // set trash colour dynamically to either black or white
    }, [state.BGColour]);

    // change font type on each song selected
    useEffect(() => {
        for (let i = 0; i < selectedForStyling.length; i++) {
            const id = "song-" + String(selectedForStyling[i]);
            const element = document.getElementById(id);
            element.style.fontFamily = '"' + state.fontType + '"';
        }
    }, [state.fontType]);

    // change font colour on each song selected
    useEffect(() => {
        for (let i = 0; i < selectedForStyling.length; i++) {
            let colourRGBA = JSON.stringify(state.fontColour);

            const id = "song-" + String(selectedForStyling[i]);
            const element = document.getElementById(id);
            const title = element.getElementsByClassName("song-title")[0];
            const artist = element.getElementsByClassName("song-artist")[0];
            const length = element.getElementsByClassName("song-length")[0];

            if (colourRGBA.slice(1, 5) == "rgba") {
                // reset gradient styling
                title.style.backgroundImage = "none";
                artist.style.backgroundImage = "none";
                length.style.backgroundImage = "none";
                title.style.backgroundClip = "border-box";
                artist.style.backgroundClip = "border-box";
                length.style.backgroundClip = "border-box";
                // set color
                title.style.color = colourRGBA.slice(1, -1);
                artist.style.color = colourRGBA.slice(1, -1);
                length.style.color = colourRGBA.slice(1, -1);
            } else {
                title.style.backgroundImage = state.fontColour;
                artist.style.backgroundImage = state.fontColour;
                length.style.backgroundImage = state.fontColour;
                title.style.color = "transparent";
                artist.style.color = "transparent";
                length.style.color = "transparent";
                title.style.backgroundClip = "text";
                artist.style.backgroundClip = "text";
                length.style.backgroundClip = "text";
            }
        }
    }, [state.fontColour]);

    // change background image each song selected
    useEffect(() => {
        if (fullBackground) {
            const wrapper =
                document.getElementsByClassName("playlist-wrapper")[0];
            let reader = new FileReader();
            reader.onloadend = function () {
                //loop through playlist and make each background transparent
                for (let i = 0; i < playlist.length; i++) {
                    const song = document.getElementsByClassName("song")[i];
                    song.style.backgroundColor = "transparent";
                }
                wrapper.style.backgroundImage = "url(" + reader.result + ")";
            };

            if (state.uploadBG) {
                reader.readAsDataURL(state.uploadBG);
            }
        } else {
            for (let i = 0; i < selectedForStyling.length; i++) {
                const id = "song-" + String(selectedForStyling[i]);
                const element = document.getElementById(id);

                let reader = new FileReader();
                reader.onloadend = function () {
                    element.style.backgroundImage =
                        "url(" + reader.result + ")";
                };

                if (state.uploadBG) {
                    reader.readAsDataURL(state.uploadBG);
                }
            }
        }
    }, [state.uploadBG]);

    useEffect(() => {
        if (fullBackground) {
            for (let i = 0; i < playlist.length; i++) {
                const song = document.getElementsByClassName("song")[i];
                song.style.backgroundColor = "transparent";
            }
            // only change last element since this is the newest one added
        }
        if (playlist.length == 0) {
            vis.setIsTrashVis(false); // hide trash icons when customise bar dissapears
        }
    }, [playlist]);

    // search background apply
    useEffect(() => {
        if (fullBackground) {
            const wrapper =
                document.getElementsByClassName("playlist-wrapper")[0];

            //loop through playlist and make each background transparent
            for (let i = 0; i < playlist.length; i++) {
                const song = document.getElementsByClassName("song")[i];
                song.style.backgroundColor = "transparent";
            }

            wrapper.style.backgroundImage = "url(" + state.searchBG + ")";
        } else {
            for (let i = 0; i < selectedForStyling.length; i++) {
                const id = "song-" + String(selectedForStyling[i]);
                const element = document.getElementById(id);

                element.style.backgroundImage = "url(" + state.searchBG + ")";
            }
        }
    }, [state.searchBG]);

    return (
        <div className="playlist">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="songs">
                    {(provided) => (
                        <div
                            className="playlist-wrapper"
                            {...provided.droppableProps}
                            ref={(el) => {
                                provided.innerRef(el);
                                playlistRef.current = el;
                            }}
                        >
                            {playlist.map((song, index) => (
                                <Draggable
                                    key={song.id}
                                    draggableId={String(song.id)}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            className="song"
                                            id={"song-" + String(song.id)}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <img
                                                alt="cover art"
                                                className="cover-art"
                                                src={song.coverArt}
                                            ></img>
                                            <div className="song-info">
                                                <p className="song-title">
                                                    {song.title}
                                                </p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                    }}
                                                >
                                                    <Explicit
                                                        style={{
                                                            display:
                                                                song.explicit
                                                                    ? "inline-block"
                                                                    : "none",
                                                            height: "1rem",
                                                        }}
                                                    />
                                                    <p className="song-artist">
                                                        {song.artist}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="song-length">
                                                <p>{song.length}</p>
                                            </div>
                                            <div className="trash-wrapper">
                                                <FontAwesomeIcon
                                                    className="trash"
                                                    icon={faTrash}
                                                    style={{
                                                        color: "#ffffff",
                                                        visibility:
                                                            vis.isTrashVis
                                                                ? "visible"
                                                                : "hidden",
                                                    }}
                                                    onClick={() =>
                                                        handleDelete(song.id)
                                                    }
                                                />
                                            </div>
                                            <div
                                                className="checkbox"
                                                style={{
                                                    visibility:
                                                        vis.isCheckboxVis
                                                            ? "visible"
                                                            : "hidden",
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    onClick={(e) =>
                                                        handleCheckboxChange(
                                                            e,
                                                            song.id
                                                        )
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Playlist;
