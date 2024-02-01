import { useState } from "react";
import axios from "axios";

export default function useFirebase() {
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
        return response.data;
    };

    const getAllImages = async () => {
        const response = await axios.get(
            import.meta.env.VITE_SERVER_URL + "/firebase/getAllImages",
            { withCredentials: true }
        );
        const data =
            response.data.length !== 0
                ? response.data.reverse()
                : response.data;
        setAllImages(data);
    };

    const getUserImages = async (username) => {
        const inputs = { username: username };
        const response = await axios.post(
            import.meta.env.VITE_SERVER_URL + "/firebase/getUserImages",
            inputs,
            { withCredentials: true }
        );
        const data =
            response.data.length !== 0
                ? response.data.reverse()
                : response.data;
        setAllUserImages(data);
    };

    return {
        allImages,
        getAllImages,
        uploadImage,
        allUserImages,
        getUserImages,
    };
}
