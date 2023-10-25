import { useState, useEffect } from "react";
import axios from "axios";
import LazyImage from "../../components/LazyImage";

function convertDate(date) {
    var myDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return myDate.toLocaleDateString("en-GB", options);
}

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
                        <LazyImage
                            src={
                                "http://localhost:8800/playlist-images/" +
                                post.image
                            }
                        />
                        <div className="post-info">
                            <div className="title">
                                <p>{post.title}</p>
                            </div>
                            <div className="date">
                                <p>{convertDate(post.date)}</p>
                            </div>
                            <div className="author">
                                <p>
                                    <span>by </span>
                                    {post.author}
                                </p>
                            </div>
                            <div></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
