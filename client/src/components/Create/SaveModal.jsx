import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import useCreateImage from "../../hooks/useCreateImage";

function SaveModal({
    isSaveModalOpen,
    setIsSaveModalOpen,
    playlistRef,
    playlist,
}) {
    const [isSaving, setIsSaving] = useState(false);
    const element = document.getElementsByClassName("playlist-wrapper")[0];

    const [post, setPost] = useState({
        title: "",
        author: "",
        date: new Date().toISOString().slice(0, 10),
    });

    const modalRef = useRef(null);
    const { image, isCreating, createImage } = useCreateImage(element);

    useEffect(() => {
        if (isSaveModalOpen) {
            modalRef.current.showModal();
        }
    }, [isSaveModalOpen]);

    const cancelModal = () => {
        modalRef.current.close();
        setIsSaveModalOpen(false);
    };

    const save = async () => {
        setIsSaving(true);
        //! handle playlist.length message to user
        if (element === null || playlist.length < 5) {
            return;
        }
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
        try {
            const formData = new FormData();
            formData.append("image", newImage);
            formData.append("title", post.title);
            formData.append("author", post.author);
            formData.append("date", post.date);

            modalRef.current.close();
            setIsSaving(false);
            setIsSaveModalOpen(false);

            await axios.post("http://localhost:8800/posts", formData);
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
                    onChange={handleChange}
                ></input>
                <input
                    type="text"
                    placeholder="Enter your username"
                    name="author"
                    onChange={handleChange}
                ></input>
                <div className="modal-btn-wrapper">
                    <button className="modal-cancel-btn" onClick={cancelModal}>
                        Cancel
                    </button>
                    <button className="modal-save-btn" onClick={save}>
                        Save
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default SaveModal;
