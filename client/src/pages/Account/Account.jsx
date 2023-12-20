import Navbar from "../../components/Navbar";
import AccountContent from "../../components/Account/AccountContent";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";

export default function Account() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        }
    }, []);

    return (
        <>
            <Navbar />
            <main className="account-main">
                <AccountContent />
            </main>
            <Footer />
        </>
    );
}
