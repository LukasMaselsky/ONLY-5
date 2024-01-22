import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faBars,
    faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const toggleLightDarkMode = () => {
    const root = document.querySelector(":root");
    const property1 = getComputedStyle(root).getPropertyValue("--background");
    const property2 = getComputedStyle(root).getPropertyValue("--text");
    root.style.setProperty("--background", property2);
    root.style.setProperty("--text", property1);
};

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
                        <img alt="logo" src={logo}></img>
                    </div>
                </Link>
            </div>
            <div className="hamburger-icon-section">
                <div className="light-dark-mode">
                    <FontAwesomeIcon
                        icon={faCircleHalfStroke}
                        onClick={() => toggleLightDarkMode()}
                    />
                </div>
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
                        <img alt="logo" src={logo}></img>
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
            <div className="light-dark-mode">
                <FontAwesomeIcon
                    icon={faCircleHalfStroke}
                    onClick={() => toggleLightDarkMode()}
                />
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
