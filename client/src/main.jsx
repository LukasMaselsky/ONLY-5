import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/authContext.jsx";
import { VisContextProvider } from "./context/visContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthContextProvider>
        <VisContextProvider>
            <App />
        </VisContextProvider>
    </AuthContextProvider>
);
