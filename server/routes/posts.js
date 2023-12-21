import express from "express";
import multer from "multer";
import { getPosts, createPost, getUserPosts } from "../controllers/posts.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/playlist-images"); // path to folder with images
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + ".png");
    },
});

const upload = multer({
    storage: storage,
});

router.post("/", upload.single("image"), createPost);
router.get("/", getPosts);
router.get("/userPosts", getUserPosts);

export default router;
