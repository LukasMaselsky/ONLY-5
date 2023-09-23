import Navbar from "../../components/Navbar";
import Feed from "./Feed";

function Explore({ playlist }) {
  return (
    <>
      <Navbar playlist={playlist} />
      <Feed />
    </>
  );
}

export default Explore;
