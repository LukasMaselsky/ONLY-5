import express from "express";
import mysql from "mysql2";
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(express.json()); // allows to send json file using client
app.use(cors());

app.get("/posts", (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/posts", (req, res) => {
  const q = "INSERT INTO posts ('id', 'title', 'author', 'date') VALUES (?)"; // ? for security idk why
  const values = [req.body.title, req.body.author, req.body.date];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post created succesfully");
  });
});

app.post("/songs", (req, res) => {
  const q =
    "INSERT INTO songs (title, artist, length, explicit, cover, postId) VALUES (?)";
  const values = [
    req.body.title,
    req.body.artist,
    req.body.length,
    req.body.explicit,
    req.body.cover,
    req.body.postId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("song sent");
  });
});

app.listen(8800, () => {
  console.log("connected");
});
