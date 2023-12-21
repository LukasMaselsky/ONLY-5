import { useState } from "react";

export function SelectFontType(props) {
    const [fontSearch, setFontSearch] = useState("");

    return (
        <div className="select-font-type">
            <button
                className="btn select-font-type-btn"
                onClick={() => props.showSelectMenu("fontType")}
            >
                Font Type
            </button>
            <div
                className="font-searcher-wrapper"
                style={{
                    display: props.fontTypePickerVis,
                }}
            >
                <div className="font-searcher">
                    <input
                        placeholder="Search for a Google font"
                        value={fontSearch}
                        onInput={(e) => setFontSearch(e.target.value)}
                    />
                </div>
                <div className="font-list">
                    {props.listOfAllFonts &&
                        props.listOfAllFonts
                            .filter((name) =>
                                name.family
                                    .toLowerCase()
                                    .includes(fontSearch.toLowerCase())
                            )
                            .map((font, index) => (
                                <div
                                    key={index}
                                    className="font"
                                    onClick={() =>
                                        props.searchForGoogleFont(font.family)
                                    }
                                >
                                    {font.family}
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
}
