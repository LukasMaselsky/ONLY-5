import { useState } from "react";
import axios from "axios";

export default function useFirebase() {
    const [imageId, setImageId] = useState("");
    const [allImages, setAllImages] = useState([]);
    const [allUserImages, setAllUserImages] = useState([]);

    const uploadImage = async (username, image) => {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("username", username);

        const response = await axios.post(
            import.meta.env.VITE_SERVER_URL + "/firebase/uploadImage",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        setImageId(response.data);
    };

    const getAllImages = async () => {
        const response = await axios.get(
            import.meta.env.VITE_SERVER_URL + "/firebase/getAllImages",
            { withCredentials: true }
        );

        setAllImages(response.data);
    };

    const getUserImages = async (username) => {
        const inputs = { username: username };
        const response = await axios.post(
            import.meta.env.VITE_SERVER_URL + "/firebase/getUserImages",
            inputs,
            { withCredentials: true }
        );
        setAllUserImages(response.data);
    };

    return {
        allImages,
        getAllImages,
        imageId,
        uploadImage,
        allUserImages,
        getUserImages,
    };
}
