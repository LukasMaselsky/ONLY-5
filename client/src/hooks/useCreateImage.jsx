import html2canvas from "html2canvas";
import { useState } from "react";

function useCreateImage(element) {
    const [image, setImage] = useState();
    const [isCreating, setIsCreating] = useState(true); //* temp fix, by setting to
    //* true the useffect if statements don't trigger and try to call during first render of component

    const createImage = () => {
        const postWidth = "1000px";
        setIsCreating(true);
        html2canvas(element, {
            windowWidth: postWidth,
            useCORS: true,
            logging: false,
            scale: 2.5, // 2.5 times the quality
        }) // windowWidth should be consistent var and take into account 70% width of wrapper
            .then((canvas) => {
                canvas.toBlob((blob) => {
                    //! 444px to get 600px width ???????????????

                    const newImage = new File([blob], "image", {
                        type: "image/png",
                    });

                    setImage(newImage);
                    setIsCreating(false);
                });
            })
            .catch((err) => {
                const newImage = null;
                setImage(newImage);
                setIsCreating(false);
            });
    };

    return { image, isCreating, createImage };
}

export default useCreateImage;
