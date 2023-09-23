import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

function SaveModal({ isSaveModalOpen, setIsSaveModalOpen, playlistRef }) {
    const element = document.getElementsByClassName("playlist-wrapper")[0];

    const [post, setPost] = useState({
        title: "",
        author: "",
        date: new Date().toISOString().slice(0, 10),
    });

    const modalRef = useRef(null);

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
        if (element === null) {
            return;
        }

        html2canvas(element, {
            windowWidth: "1000px",
            useCORS: true,
            logging: false,
        }) // windowWidth should be consistent var and take into account 70% width of wrapper
            .then((canvas) => {
                canvas.toBlob((blob) => {
                    //! 444px to get 600px width ???????????????
                    const newImage = new File([blob], "image", {
                        type: "image/png",
                    });

                    // ! EXPERIMENT
                    let img = document.createElement("img");
                    img.src = URL.createObjectURL(blob);
                    console.log(img);
                    // ! EXPERIMENT

                    //postData(newImage);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const postData = async (newImage) => {
        try {
            const formData = new FormData();
            formData.append("image", newImage);
            formData.append("title", post.title);
            formData.append("author", post.author);
            formData.append("date", post.date);

            modalRef.current.close();
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
            <div className="save-modal-wrapper">
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
