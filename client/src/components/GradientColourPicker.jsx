import ColorPicker from "react-best-gradient-color-picker";

function GradientColourPicker(props) {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "0.5rem",
                borderRadius: "6px",
            }}
        >
            <ColorPicker
                value={props.value}
                onChange={props.onChange}
                hidePresets="true"
                hideEyeDrop="true"
                hideAdvancedSliders="true"
                hideColorGuide="true"
                hideInputType="true"
                hideInputs="true"
                height="150"
            />
        </div>
    );
}

export default GradientColourPicker;
