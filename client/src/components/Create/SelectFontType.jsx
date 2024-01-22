import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import axios from "axios";

export function SelectFontType(props) {
    const [fontSearch, setFontSearch] = useState("");
    const [listOfAllFonts, setListOfAllFonts] = useState(null);
    const [failedLoadFonts, setFailedLoadFonts] = useState(false);

    //! add message for user not in console
    //!! WHY DOES STILL TRIGGER WHEN THERE ISNT ERROR
    const handleGoogleFontError = () => {};

    const searchForGoogleFont = (family) => {
        const WebFontConfig = {
            active: props.dispatch({ type: "setFontType", font: family }),
            inactive: handleGoogleFontError(),
        };

        WebFont.load({
            google: {
                families: [family],
            },
        });
    };

    useEffect(() => {
        if (props.state.fontTypePickerVis == "flex" && listOfAllFonts == null) {
            // fetch list of all fonts when font search bar appears for the first time
            axios
                .get(
                    "https://www.googleapis.com/webfonts/v1/webfonts?key=" +
                        import.meta.env.VITE_GOOGLE_FONTS_API_KEY
                )
                .then((response) => {
                    setListOfAllFonts(response.data.items); // array
                })
                .catch((err) => {
                    setFailedLoadFonts(true);
                });
        }
    }, [props.state.fontTypePickerVis]);

    return (
        <div className="select-font-type">
            <button
                aria-label="font type"
                className="btn select-font-type-btn"
                onClick={() => props.showSelectMenu("fontType")}
            >
                Font Type
            </button>
            <div
                className="font-searcher-wrapper"
                style={{
                    display: props.state.fontTypePickerVis,
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
                    {failedLoadFonts ? (
                        <div>Failed to load fonts</div>
                    ) : (
                        listOfAllFonts &&
                        listOfAllFonts
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
                                        searchForGoogleFont(font.family)
                                    }
                                >
                                    {font.family}
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}
