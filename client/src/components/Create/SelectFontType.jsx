export function SelectFontType(props) {
    return (
        <div className="select-font-type">
            <button
                className="select-font-type-btn"
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
                        value={props.fontSearch}
                        onInput={(e) => props.setFontSearch(e.target.value)}
                    />
                </div>
                <div className="font-list">
                    {props.listOfAllFonts &&
                        props.listOfAllFonts
                            .filter((name) =>
                                name.family
                                    .toLowerCase()
                                    .includes(props.fontSearch.toLowerCase())
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
