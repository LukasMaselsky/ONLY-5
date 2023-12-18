import Navbar from "../../components/Navbar";
import AccountContent from "../../components/Account/AccountContent";
import Footer from "../../components/Footer";

export default function Account() {
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
