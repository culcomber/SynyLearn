import React, { useContext } from "react";
import {ThemeContext} from "./ThemeProvider";

export default function Toggle() {
    const theme:{ theme: {}, toggleTheme: ()=>void } = useContext(ThemeContext);

    return (
        <label className="switch">
            <input type="checkbox" onClick={theme.toggleTheme} />
            <span className="slider round" />
        </label>
    );
}