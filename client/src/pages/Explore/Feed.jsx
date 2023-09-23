import { useState, useEffect } from "react";
import axios from "axios";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8800/posts")
            .then((res) => {
                //console.log(res.data);
                setPosts((prev) => [...prev, ...res.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="feed">
            <div className="feed-wrapper">
                {posts.map((post, index) => (
                    <div className="post" key={post.id}>
                        <img
                            src={
                                "http://localhost:8800/playlist-images/" +
                                post.image
                            }
                            style={{ height: "400px" }} // has to be 400px since for some reason html2canvas defaults to 120px per song = 120 x 5 = 600px
                        ></img>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
