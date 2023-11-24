import GradientColourPicker from "../GradientColourPicker";

export function SelectFontColour(props) {
    return (
        <div className="select-font-colour">
            <button
                className="select-font-colour-btn"
                onClick={() => props.showSelectMenu("fontColour")}
            >
                {" "}
                Font Colour
            </button>
            <div
                className="font-colour-picker"
                style={{
                    display: props.state.fontColourPickerVis,
                }}
            >
                <GradientColourPicker
                    style={{
                        display: props.state.fontColourPickerVis,
                    }}
                    value={props.state.fontColour}
                    onChange={props.handleFontColourChange}
                />
            </div>
        </div>
    );
}
