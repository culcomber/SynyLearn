import React, {useState} from "react";
import Toggle from "./Toggle";
import List from "../../Performance/List";

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

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const providerValue = {
        theme: themes[theme],
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={providerValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export default function ThemeHook() {
    let theme;
    return (
        <div className={`App theme-${theme}`}>
            <ThemeProvider>
                <Toggle />
                <List />
            </ThemeProvider>
        </div>
    );
}