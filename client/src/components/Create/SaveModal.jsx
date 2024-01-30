import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import ScaleLoader from "react-spinners/ScaleLoader";
import useCreateImage from "../../hooks/useCreateImage";
import { Link } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";

function SaveModal({
    isSaveModalOpen,
    setIsSaveModalOpen,
    playlistRef,
    playlist,
}) {
    const { currentUser } = useContext(AuthContext);

    const [isSaving, setIsSaving] = useState(false);
    const element = document.getElementsByClassName("playlist-wrapper")[0];

    const [post, setPost] = useState({
        title: "",
        date: new Date().toISOString().slice(0, 10),
    });
    const [error, setError] = useState(null);

    const modalRef = useRef(null);
    const { image, isCreating, createImage } = useCreateImage(element);
    const { imageId, uploadImage } = useFirebase();

    useEffect(() => {
        if (isSaveModalOpen) {
            modalRef.current.showModal();
            setError(null);
        }
    }, [isSaveModalOpen]);

    const cancelModal = () => {
        modalRef.current.close();
        setIsSaveModalOpen(false);
    };

    const save = async () => {
        if (element === null) {
            return;
        }
        if (!post.title.length) {
            setError("Title can't be empty");
            return;
        }
        if (post.title.length > 45) {
            setError("Title can't be over 45 characters");
            return;
        }
        if (playlist.length < 5) {
            setError("Playlist has to contain 5 songs");
            return;
        }

        setIsSaving(true);
        createImage();
    };

    useEffect(() => {
        const savePost = async () => {
            if (!isCreating) {
                postData(image);
            }
        };
        savePost();
    }, [isCreating]);

    const postData = async (newImage) => {
        if (!newImage) return; // prevents first use effect call on initial render
        try {
            // upload image to firebase storage
            await uploadImage(currentUser.username, newImage);

            const inputs = {
                image: imageId,
                title: post.title,
                username: currentUser.username,
                date: post.date,
            };

            modalRef.current.close();
            setIsSaving(false);
            setIsSaveModalOpen(false);

            await axios.post(
                import.meta.env.VITE_SERVER_URL + "/posts",
                inputs,
                { withCredentials: true }
            );
        } catch (err) {
            console.log(err);
        }
    };

    // detect esc pressed to exit
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode == 27) {
                modalRef.current.close();
                setIsSaveModalOpen(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <dialog className="save-modal" ref={modalRef}>
            <ScaleLoader
                color={getComputedStyle(
                    document.querySelector(":root")
                ).getPropertyValue("--background")}
                loading={isSaving}
                height={75}
                width={8}
                radius={4}
                aria-label="Loading Spinner"
                data-testid="loader"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <div
                className="save-modal-wrapper"
                style={{ visibility: isSaving ? "hidden" : "visible" }}
            >
                <h1>Save Playlist</h1>
                <input
                    type="text"
                    placeholder="Enter title of playlist"
                    name="title"
                    required={true}
                    onChange={handleChange}
                ></input>
                {error && <p>{error}</p>}
                {currentUser === null && (
                    <>
                        <p>You have to be logged in to save</p>
                        <span>
                            <Link to="/login">Login</Link>
                            <Link to="/Register">Register</Link>
                        </span>
                    </>
                )}
                <div className="modal-btn-wrapper">
                    <button
                        aria-label="cancel"
                        className="modal-cancel-btn"
                        onClick={cancelModal}
                    >
                        Cancel
                    </button>
                    <button
                        aria-label="save"
                        className="modal-save-btn"
                        onClick={save}
                    >
                        Save
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default SaveModal;
