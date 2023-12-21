import GradientColourPicker from "../GradientColourPicker";

export function SelectColour(props) {
    return (
        <div className="select-colour">
            <button
                className="btn select-colour-btn"
                onClick={() => props.showSelectMenu("BGColour")}
            >
                Background Colour
            </button>
            <div
                className="background-colour-picker"
                style={{
                    display: props.state.BGColourPickerVis,
                }}
            >
                <GradientColourPicker
                    style={{
                        display: props.state.BGColourPickerVis,
                    }}
                    value={props.state.BGColour}
                    onChange={props.handleBGColourChange}
                />
            </div>
        </div>
    );
}
