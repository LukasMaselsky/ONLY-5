import Navbar from "../../components/Navbar";
import GuideContent from "../../components/Guide/GuideContent";
import Footer from "../../components/Footer";

function Guide() {
    return (
        <>
            <Navbar />
            <main className="guide-main">
                <GuideContent />
            </main>
            <Footer />
        </>
    );
}

export default Guide;
