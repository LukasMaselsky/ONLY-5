import Navbar from "../../components/Navbar";
import RegisterForm from "../../components/Register/RegisterForm";
import Footer from "../../components/Footer";

export default function Register() {
    return (
        <>
            <Navbar />
            <main className="register-main">
                <RegisterForm />
            </main>
            <Footer />
        </>
    );
}
