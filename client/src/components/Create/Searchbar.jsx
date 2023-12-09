import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useTogglePopup from "../../hooks/useTogglePopup";

function Searchbar({ setSearch, playlist }) {
    const [titleSearch, setTitleSearch] = useState("");
    const [isToggled, togglePopup] = useTogglePopup();

    const handleSearch = (e) => {
        e.preventDefault();

        setSearch(titleSearch);
        handlePopup();
    };

    const handlePopup = () => {
        if (titleSearch == "" && !isToggled) {
            togglePopup(1, 5000, "search-popup");
        } else if (playlist.length == 5 && !isToggled) {
            togglePopup(0, 5000, "search-popup");
        }
    };

    return (
        <div className="search">
            <div></div> {/* empty div for grid cetnering to work */}
            <input
                className="title-search"
                name="title-search"
                placeholder="Search for a song"
                value={titleSearch}
                onInput={(e) => setTitleSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <FontAwesomeIcon
                className="search-button"
                icon={faMagnifyingGlass}
                onClick={handleSearch}
            />
            <div className="search-popup">
                <p>You can only add 5 songs</p>
            </div>
            <div className="search-popup">
                <p>Please enter a song name</p>
            </div>
        </div>
    );
}

export default Searchbar;
