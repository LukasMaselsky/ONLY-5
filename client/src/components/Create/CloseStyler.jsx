import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export function CloseStyler(props) {
    return (
        <div
            className="close-styler"
            style={
                props.anyStylerOpen
                    ? {
                          display: "flex",
                      }
                    : {
                          display: "none",
                      }
            }
        >
            <FontAwesomeIcon
                className="close-style-btn"
                icon={faSquareCheck}
                style={{
                    color: "#86DA98",
                    height: "3rem",
                }}
                onClick={() => props.finishStyling()}
            />
        </div>
    );
}
