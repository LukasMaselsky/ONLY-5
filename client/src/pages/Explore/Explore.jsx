import Navbar from "../../components/Navbar";
import Feed from "../../components/Explore/Feed";

function Explore({ playlist }) {
    return (
        <>
            <Navbar playlist={playlist} />
            <Feed />
        </>
    );
}

export default Explore;
