import Navbar from "../../components/Navbar";
import AboutContent from "../../components/About/AboutContent";
import Footer from "../../components/Footer";

function About() {
    return (
        <>
            <Navbar />
            <main className="about-main">
                <AboutContent />
            </main>
            <Footer />
        </>
    );
}

export default About;
