import Explicit from "./Explicit";
import explicit from "../../assets/explicit.png";

const milliToMin = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals
    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function ChooseSongList({
    setPlaylist,
    playlist,
    setIsChoosing,
    callSongs,
    setOffsetCounter,
    offsetCounter,
    isLoading,
    selection,
}) {
    const loadMoreSongs = () => {
        callSongs(offsetCounter);
        setOffsetCounter((counter) => counter + 5);
    };

    const chooseAddition = (title, artist, length, cover, explicit) => {
        // update playlist with new song after selection from options
        setPlaylist((prevItems) => [
            ...prevItems,
            {
                title: title,
                artist: artist,
                id:
                    playlist.length !== 0
                        ? playlist[playlist.length - 1].id + 1
                        : 0, // if array not empty
                length: length,
                coverArt: cover,
                explicit: explicit,
            },
        ]);
        //! HIDE POPUP
        setIsChoosing(false);
    };

    const getArtistNames = (arr) => {
        return arr.map((artist) => artist.name).join(", ");
    };

    return (
        <div
            className="choose-song-wrapper"
            style={{
                display: isLoading ? "none" : "inline",
            }}
        >
            <h1 className="choose-song-heading">Choose song to add</h1>
            {selection &&
                selection.map((song) => (
                    <div
                        className="song popup"
                        onClick={() =>
                            chooseAddition(
                                song["name"],
                                getArtistNames(song["artists"]),
                                milliToMin(song["duration_ms"]),
                                song["album"]["images"][0]["url"],
                                song["explicit"]
                            )
                        }
                        key={song.id}
                    >
                        <img
                            className="cover-art"
                            alt="cover art"
                            src={song["album"]["images"][0]["url"]}
                        ></img>

                        <div className="song-info">
                            <p
                                className="song-title choose"
                                style={{ fontSize: "1.5rem" }}
                            >
                                {song["name"]}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                }}
                            >
                                <img
                                    src={explicit}
                                    style={{
                                        display: song.explicit
                                            ? "inline-block"
                                            : "none",
                                    }}
                                    className="explicit"
                                ></img>
                                <p className="song-artist choose">
                                    {getArtistNames(song["artists"])}
                                </p>
                            </div>
                        </div>
                        <div className="song-length">
                            <p>
                                {song["duration_ms"] !== undefined
                                    ? milliToMin(song["duration_ms"])
                                    : "-"}
                            </p>
                        </div>
                    </div>
                ))}
            <span className="load-more" onClick={() => loadMoreSongs()}>
                Load More
            </span>
        </div>
    );
}

export default ChooseSongList;
