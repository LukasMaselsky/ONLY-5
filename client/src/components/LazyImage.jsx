import { useEffect, useState, useRef } from "react";

function LazyImage({ src }) {
    const [inView, setInView] = useState(false);
    const imgRef = useRef();

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setInView(true);
            }
        });
    };

    useEffect(() => {
        let observer = new IntersectionObserver(callback);

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    return inView ? (
        <img src={src}></img>
    ) : (
        <img
            ref={imgRef}
            style={{
                width: "100%",
                height: "50vh",
                backgroundColor: getComputedStyle(
                    document.querySelector(":root")
                ).getPropertyValue("--background"),
            }}
        />
    );
}

export default LazyImage;
