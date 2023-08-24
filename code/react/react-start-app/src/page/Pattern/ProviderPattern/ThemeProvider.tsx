import React, {useState} from "react";
import "./ThemeProvider.css";
import Toggle from "./Toggle";
import Boxes from "./Boxes";

export const themes = {
    light: {
        background: "#fff",
        color: "#000"
    },
    dark: {
        background: "#171717",
        color: "#fff"
    }
};

export const ThemeContext = React.createContext(
    {theme: {}, toggleTheme: ()=>{}});

export default function ThemeProvider() {
    const [theme, setTheme] = useState("dark");

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    /*.App.theme-light {
        background-color: #fff;
    }
    .App.theme-dark {
        background-color: #171717;
    }*/
    return (
        <div className={`AppProvider theme-${theme}`}>
            <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
                <>
                    <Toggle />
                    <Boxes />
                </>
            </ThemeContext.Provider>
        </div>
    );
}