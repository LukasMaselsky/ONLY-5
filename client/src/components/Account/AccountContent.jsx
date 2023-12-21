import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import LazyImage from "../Explore/LazyImage";
import convertDate from "../Explore/convertDate";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function AccountContent() {
    const [posts, setPosts] = useState([]);
    const [postsFailedLoad, setPostsFailedLoad] = useState(false);
    const { currentUser, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_SERVER_URL + "/posts/userPosts", {
                withCredentials: true,
            })
            .then((res) => {
                setPosts((prev) => [...prev, ...res.data]);
            })
            .catch((err) => {
                setPostsFailedLoad(true);
            });
    }, []);

    return (
        <div className="account-wrapper">
            {
                <div className="account-header">
                    <h1>{currentUser && currentUser.username}</h1>
                    <button
                        className="btn"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            }
            {postsFailedLoad ? (
                <GridFailedLoad />
            ) : (
                <AccountGrid posts={posts} />
            )}
        </div>
    );
}

export default AccountContent;

function AccountGrid({ posts }) {
    return (
        <div className="account-grid">
            {posts &&
                posts.map((post) => (
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
                            <div></div>
                            {/* for grid*/}
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

function GridFailedLoad() {
    const root = document.querySelector(":root");
    const primary = getComputedStyle(root).getPropertyValue("--primary");

    return (
        <div className="feed-failed-load">
            <FontAwesomeIcon
                icon={faRotate}
                style={{ color: primary, fontSize: "5rem" }}
            />
            <p>The posts failed to load.</p>
            <p>Check your internet connection and try again.</p>
        </div>
    );
}
