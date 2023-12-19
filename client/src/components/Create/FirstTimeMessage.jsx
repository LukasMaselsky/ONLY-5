import { Link } from "react-router-dom";

function FirstTimeMessage({ playlist }) {
    return (
        <div
            className="first-time-message"
            style={{ display: playlist.length > 0 ? "none" : "inline" }}
        >
            <p>
                First time here? See the{" "}
                <Link to="/guide">
                    <span>guide</span>
                </Link>
            </p>
        </div>
    );
}

export default FirstTimeMessage;
