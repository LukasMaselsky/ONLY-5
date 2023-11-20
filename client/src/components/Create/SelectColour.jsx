import { ChromePicker } from "react-color";

export function SelectColour(props) {
    return (
        <div className="select-colour">
            <button
                className="select-colour-btn"
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
                <ChromePicker
                    style={{
                        display: props.state.BGColourPickerVis,
                    }}
                    color={props.state.BGColour}
                    onChangeComplete={props.handleBGColourChange}
                />
            </div>
        </div>
    );
}
