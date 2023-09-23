import express from "express";
import mysql from "mysql2";
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";

const app = express();
app.use(express.json()); // allows to send json file using client
app.use(cors());
app.use(express.static("public"));

dotenv.config({ path: "./.env" });

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

app.post("/posts", upload.single("image"), (req, res) => {
  const q = "INSERT INTO posts (title, author, date, image) VALUES (?)"; // ? for security idk why
  const values = [
    req.body.title,
    req.body.author,
    req.body.date,
    req.file.filename,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post created succesfully");
  });
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/posts", (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("connected");
});
