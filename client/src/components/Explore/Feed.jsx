import { useState, useEffect } from "react";
import axios from "axios";
import LazyImage from "./LazyImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

function convertDate(date) {
    var myDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return myDate.toLocaleDateString("en-GB", options);
}

function Feed() {
    const [posts, setPosts] = useState([]);
    const [postsFailedLoad, setPostsFailedLoad] = useState(false);

    useEffect(() => {
        axios
            .get("/posts")
            .then((res) => {
                //console.log(res.data);
                setPosts((prev) => [...prev, ...res.data]);
            })
            .catch((err) => {
                setPostsFailedLoad(true);
            });
    }, []);

    return (
        <div className="feed">
            {postsFailedLoad ? (
                <FeedFailedLoad />
            ) : (
                <FeedWrapper posts={posts} />
            )}
        </div>
    );
}

export default Feed;

function FeedWrapper({ posts }) {
    return (
        <div className="feed-wrapper">
            {posts &&
                posts.map((post, index) => (
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
                            <div></div> {/* for grid*/}
                        </div>
                    </div>
                ))}
        </div>
    );
}

function FeedFailedLoad() {
    const root = document.querySelector(":root");
    const primary = getComputedStyle(root).getPropertyValue("--primary");

    return (
        <div className="feed-failed-load">
            <FontAwesomeIcon
                icon={faRotate}
                style={{ color: primary, fontSize: "5rem" }}
            />
            <p>The feed failed to load.</p>
            <p>Check your internet connection and try again.</p>
        </div>
    );
}
