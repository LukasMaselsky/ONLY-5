import express from "express";
import mysql from "mysql2";
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();
app.use(express.json()); // allows to send json file using client
app.use(cors());
app.use(express.static("public"));

app.use("/server/posts", postRoutes);

app.listen(8800, () => {
    console.log("connected");
});
