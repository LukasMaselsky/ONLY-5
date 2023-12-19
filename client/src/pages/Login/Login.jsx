import Navbar from "../../components/Navbar";
import LoginForm from "../../components/Login/LoginForm";
import Footer from "../../components/Footer";

export default function Login() {
    return (
        <>
            <Navbar />
            <main className="login-main">
                <LoginForm />
            </main>
            <Footer />
        </>
    );
}
