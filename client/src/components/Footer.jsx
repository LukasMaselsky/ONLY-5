import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-wrapper">
                <div className="footer-main">
                    <div className="footer-info">
                        <h2>Info</h2>
                        <Link
                            to="/about"
                            onClick={() => {
                                window.scroll(0, 0);
                            }}
                        >
                            About us
                        </Link>
                    </div>
                    <div className="footer-contact">
                        <h2>Contact</h2>
                        <a
                            href="mailto:lukasmaselsky@gmail.com"
                            target="_blank"
                        >
                            Email
                        </a>
                    </div>
                </div>
                <div className="footer-credit">
                    <p>
                        Made by{" "}
                        <a
                            target="_blank"
                            href="https://github.com/LukasMaselsky"
                        >
                            Lukas Maselsky
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
