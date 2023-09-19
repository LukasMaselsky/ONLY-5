import express from "express";
import mysql from "mysql2";
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";

const app = express();

dotenv.config({ path: "./.env" });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    db(null, "public/playlist-images");
  },
  filename: (req, file, callback) => {
    db(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/posts", upload.single("image"), (req, res) => {
  console.log(req.file);
});

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


app.post("/posts", upload.single("image"), (req, res) => {
  const q = "INSERT INTO posts (title, author, date, image) VALUES (?)"; // ? for security idk why
  const values = [
    req.body.title,
    req.body.author,
    req.body.date,
    req.body.image,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Post created succesfully");
  });
});

app.listen(8800, () => {
  console.log("connected");
});
