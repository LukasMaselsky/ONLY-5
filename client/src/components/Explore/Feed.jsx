import { useState, useEffect } from "react";
import axios from "axios";
import LazyImage from "./LazyImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import convertDate from "./convertDate";
import useFirebase from "../../hooks/useFirebase";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [postsFailedLoad, setPostsFailedLoad] = useState(false);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_SERVER_URL + "/posts")
            .then((res) => {
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
    const { allImages, getAllImages } = useFirebase();

    useEffect(() => {
        const getImages = async () => {
            await getAllImages();
        };
        getImages();
    }, []);

    return (
        <div className="feed-wrapper">
            {posts &&
                posts.map((post, index) => (
                    <div className="post" key={post.id}>
                        <LazyImage
                            src={
                                allImages.length == 0 ? null : allImages[index]
                            }
                        />
                        <div className="post-info">
                            <div className="title">
                                <p>{post.title}</p>
                            </div>
                            <div></div> {/* for grid*/}
                            <div className="author">
                                <p>
                                    <span>by </span>
                                    {post.username}
                                </p>
                            </div>
                            <div className="date">
                                <p>{convertDate(post.date)}</p>
                            </div>
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
