import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function Delete(props) {
    return (
        <div className="delete">
            <FontAwesomeIcon
                className="trash"
                icon={faTrash}
                style={{
                    height: "2rem",
                }}
                onClick={() => props.vis.setIsTrashVis(!props.vis.isTrashVis)}
            />
        </div>
    );
}
