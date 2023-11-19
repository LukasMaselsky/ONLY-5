import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function SearchBackground(props) {
    return (
        <div className="search-background">
            <button
                className="search-background-btn"
                onClick={() => props.showSelectMenu("searchBackground")}
            >
                Search Background
            </button>
            <div
                className="image-searcher-wrapper"
                style={{
                    display: props.searchBackgroundVis,
                }}
            >
                <div className="image-searcher">
                    <input
                        placeholder="Search for a wallpaper"
                        value={props.imageSearch}
                        onInput={(e) => props.setImageSearch(e.target.value)}
                    />
                    <FontAwesomeIcon
                        className="search-button"
                        icon={faMagnifyingGlass}
                        style={{ color: "black" }}
                        onClick={() => props.searchForImage()}
                    />
                </div>
                <div className="image-list">
                    {props.imageSearchChoices &&
                        props.imageSearchChoices.map((choice, index) => (
                            <div
                                key={index}
                                className="image-choice"
                                onClick={() =>
                                    props.dispatch({
                                        type: "setSearchBackground",
                                        image: choice,
                                    })
                                }
                            >
                                <img src={choice}></img>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
