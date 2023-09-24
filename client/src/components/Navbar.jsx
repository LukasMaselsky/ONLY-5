import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    const root = document.querySelector(":root");
    const primary = getComputedStyle(root).getPropertyValue("--primary");
    const secondary = getComputedStyle(root).getPropertyValue("--secondary");
    const accent = getComputedStyle(root).getPropertyValue("--accent");

    return <>{windowWidth > 600 ? <NavNormal /> : <NavHamburger />}</>;
}

export default Navbar;

function NavHamburger() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <nav style={{ justifyContent: "space-between" }}>
            <div
                id="nav-logo-section"
                className="nav-section"
                style={{ flexGrow: "0", margin: "0" }}
            >
                <Link to="/">
                    <div className="logo">
                        <img src={logo}></img>
                    </div>
                </Link>
            </div>
            <div className="hamburger-icon-section">
                <div className="hamburger">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => setNavOpen(!navOpen)}
                    />
                </div>
            </div>
            <div
                className="hamburger-nav"
                style={{ display: navOpen ? "block" : "none" }}
            >
                <div className="hamburger-nav-section">
                    <Link to="/" className="hamburger-nav-button">
                        <p>Home</p>
                    </Link>
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/create" className="hamburger-nav-button">
                        <p>Create</p>
                    </Link>
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/explore" className="hamburger-nav-button">
                        <p>Explore</p>
                    </Link>
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/contact" className="hamburger-nav-button">
                        <p>Contact</p>
                    </Link>
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/account" className="hamburger-nav-button">
                        <p>Account</p>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

function NavNormal() {
    return (
        <nav>
            <div id="nav-logo-section" className="nav-section">
                <Link to="/">
                    <div className="logo">
                        <img src={logo}></img>
                    </div>
                </Link>
            </div>
            <div id="nav-home-section" className="nav-section">
                <Link to="/" className="nav-button">
                    <p>Home</p>
                </Link>
            </div>
            <div id="nav-create-section" className="nav-section">
                <Link to="/create" className="nav-button">
                    <p>Create</p>
                </Link>
            </div>
            <div id="nav-explore-section" className="nav-section">
                <Link to="/explore" className="nav-button">
                    <p>Explore</p>
                </Link>
            </div>
            <div id="nav-contact-section" className="nav-section">
                <Link to="/contact" className="nav-button">
                    <p>Contact</p>
                </Link>
            </div>
            <div id="nav-account-section" className="nav-section">
                <Link
                    to="/account"
                    className="nav-button"
                    id="nav-button-account"
                >
                    <FontAwesomeIcon
                        className="account"
                        icon={faUser}
                        style={{ fontSize: "1rem" }}
                    />
                </Link>
            </div>
        </nav>
    );
}
