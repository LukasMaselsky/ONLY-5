import { useState } from "react";

function useTogglePopup() {
    const [isToggled, setIsToggled] = useState(false);

    async function togglePopup(index, time, className) {
        setIsToggled(true);
        let popup = document.getElementsByClassName(className)[index];
        popup.classList.toggle("show");
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        }).then(() => {
            popup.classList.toggle("show");
            setIsToggled(false);
        });
    }

    return [isToggled, togglePopup];
}

export default useTogglePopup;
