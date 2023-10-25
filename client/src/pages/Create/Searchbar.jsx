import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Searchbar({ setSearch, playlist }) {
    const [titleSearch, setTitleSearch] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        setSearch(titleSearch);
        handlePopup();
    };

    const handlePopup = () => {
        if (titleSearch == "" && !isToggled) {
            togglePopup(1, 5000);
        } else if (playlist.length == 5 && !isToggled) {
            togglePopup(0, 5000);
        }
    };

    async function togglePopup(index, time) {
        setIsToggled(true);
        let popup = document.getElementsByClassName("search-popup")[index];
        popup.classList.toggle("show");
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        }).then(() => {
            popup.classList.toggle("show");
            setIsToggled(false);
        });
    }

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
                style={{ color: "#ffffff" }}
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
