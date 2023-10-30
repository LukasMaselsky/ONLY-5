import { ChromePicker } from "react-color";

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
                <ChromePicker
                    style={{
                        display: props.state.fontColourPickerVis,
                    }}
                    color={props.state.fontColour}
                    onChangeComplete={props.handleFontColourChange}
                />
            </div>
        </div>
    );
}
