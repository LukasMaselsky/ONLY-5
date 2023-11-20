import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export function Save(props) {
    return (
        <div className="save">
            <FontAwesomeIcon
                className="save-btn"
                icon={faFloppyDisk}
                style={{
                    height: "2rem",
                }}
                onClick={() => props.setIsSaveModalOpen(true)}
            />
        </div>
    );
}
