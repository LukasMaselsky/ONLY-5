import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Welcome() {
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        setPageLoaded(true);
    }, []);

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div className="welcome">
                    <h1
                        className="welcome-text"
                        style={{
                            transform: !pageLoaded
                                ? "translate(50%, 50%)"
                                : "translate(1%, 0%)",
                            zIndex: "-1",
                        }}
                    >
                        ONLY 5
                    </h1>
                </div>
                <div className="welcome">
                    <h1 className="welcome-text" style={{ zIndex: "-1" }}>
                        ONLY 5
                    </h1>
                </div>
                <div className="welcome">
                    <h1
                        className="welcome-text"
                        style={{
                            transform: !pageLoaded
                                ? "translate(-50%, -50%)"
                                : "translate(-1%, 0%)",
                        }}
                    >
                        ONLY 5
                    </h1>
                </div>
                <div className="enter-link">
                    <Link to="/create">ENTER</Link>
                </div>
            </div>
        </>
    );
}

export default Welcome;
