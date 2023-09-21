import { useState, useEffect } from "react"
import axios from "axios"

function Feed() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8800/posts')
        .then((res) => {
            console.log(res.data)
            setPosts(prev => [...prev, ...res.data])
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="feed">
            <div className="feed-wrapper">
                {posts.map((post, index) => (
                    <div className='post' key={post.id}>
                        <img src={'http://localhost:8800/playlist-images/' + post.image}></img>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feed;