import { db } from "../db.js";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const createPost = (req, res) => {
    const q = "INSERT INTO posts (title, username, date, image) VALUES (?)"; // ? for security idk why
    const values = [
        req.body.title,
        req.body.author,
        req.body.date,
        req.file.filename,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log("Post created successfully");
        }
    });
};
