import express from "express";
//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import firebaseRoutes from "./routes/firebase.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json()); // allows to send json file using client
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static("public"));

app.use("/server/posts", postRoutes);
app.use("/server/auth", authRoutes);
app.use("/server/firebase", firebaseRoutes);

app.listen(8800, () => {
    console.log("connected");
});
