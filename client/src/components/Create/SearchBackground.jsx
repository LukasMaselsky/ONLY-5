import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function SearchBackground(props) {
    const [imageSearch, setImageSearch] = useState("");
    const [imageSearchChoices, setImageSearchChoices] = useState(null);
    const [imageSearchOption, setImageSearchOption] = useState("all");

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
                const images = response["data"]["hits"].slice(0, 10);

                setImageSearchChoices(images.map((i) => i.largeImageURL));
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                        value={imageSearch}
                        onInput={(e) => setImageSearch(e.target.value)}
                    />

                    <select
                        className="image-option-select"
                        onChange={(e) => setImageSearchOption(e.target.value)}
                        defaultValue={imageSearchOption}
                    >
                        <option value="all">All</option>
                        <option value="photo">Photo</option>
                        <option value="illustration">Illustration</option>
                        <option value="vector">Vector</option>
                    </select>
                    <FontAwesomeIcon
                        className="search-button"
                        icon={faMagnifyingGlass}
                        style={{ color: "black" }}
                        onClick={() => searchForImage()}
                    />
                </div>
                <div className="image-list">
                    {imageSearchChoices &&
                        imageSearchChoices.map((choice, index) => (
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
                <div>
                    <p>powered by Pixabay</p>
                </div>
            </div>
        </div>
    );
}
