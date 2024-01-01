import { createContext, useState } from "react";

export const VisContext = createContext();

export const VisContextProvider = ({ children }) => {
    const [isCheckboxVis, setIsCheckboxVis] = useState(false);
    const [isSelectButtonsVis, setIsSelectButtonsVis] = useState(false);
    const [whichCustomiseOption, setWhichCustomiseOption] = useState("");
    const [isTrashVis, setIsTrashVis] = useState(false);

    return (
        <VisContext.Provider
            value={{
                isCheckboxVis: isCheckboxVis,
                setIsCheckboxVis: setIsCheckboxVis,
                isSelectButtonsVis: isSelectButtonsVis,
                setIsSelectButtonsVis: setIsSelectButtonsVis,
                whichCustomiseOption: whichCustomiseOption,
                setWhichCustomiseOption: setWhichCustomiseOption,
                isTrashVis: isTrashVis,
                setIsTrashVis: setIsTrashVis,
            }}
        >
            {children}
        </VisContext.Provider>
    );
};
