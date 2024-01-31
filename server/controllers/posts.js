import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data.rows);
    });
};

export const getUserPosts = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        //const q = "SELECT * FROM posts WHERE user_id = ?";
        const q = "SELECT * FROM posts WHERE user_id = ($1)";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data.rows);
        });
    });
};

export const createPost = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        //const q ="INSERT INTO posts(`title`, `username`, `date`, `image`, `user_id`) VALUES (?)";
        const q =
            "INSERT INTO posts(title, username, date, image, user_id) VALUES ($1, $2, $3, $4, $5)";

        const values = [
            req.body.title,
            req.body.username,
            req.body.date,
            req.body.image,
            userInfo.id,
        ];

        db.query(q, [...values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
};
