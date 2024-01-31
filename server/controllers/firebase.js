import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../routes/firebase.js";
import { v4 } from "uuid";
import winston from "winston";

export const uploadImage = async (req, res) => {
    if (!req.file) return res.status(500).json("image is undefined");

    const imageId = v4();
    const imageFilename = req.body.username + "_" + imageId;
    const imageRef = ref(storage, `images/${imageFilename}`);
    const metadata = {
        contentType: "image/png",
    };
    try {
        const response = await uploadBytes(imageRef, req.file.buffer, metadata);
        return res.json(imageId);
    } catch (err) {
        console.log(err);
    }
};

export const getAllImages = async (req, res) => {
    const allImagesRef = ref(storage, "images/");
    try {
        let imageArray = [];
        const response = await listAll(allImagesRef);
        for (const item of response.items) {
            const url = await getDownloadURL(item);
            imageArray.push(url);
        }

        return res.json(imageArray);
    } catch (err) {
        console.log("something went wrong with get all images");
    }
};

export const getUserImages = async (req, res) => {
    const allImagesRef = ref(storage, "images/");
    try {
        let imageArray = [];
        const response = await listAll(allImagesRef);
        for (const item of response.items) {
            const filename = item._location.path_.replace("images/", "");
            const filenameArray = filename.split("_");
            const fileUsername = filenameArray[0];

            if (req.body.username == fileUsername) {
                const url = await getDownloadURL(item);
                imageArray.push(url);
            }
        }
        return res.json(imageArray);
    } catch (err) {
        console.log(err);
    }
};
