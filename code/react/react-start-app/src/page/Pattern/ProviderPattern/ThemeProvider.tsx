import React from "react";
import "./styles.css";
import Toggle from "./Toggle";
import Boxes from "./Boxes";

export default function ThemeProvider() {
    return (
        <div className="App">
            <Toggle />
            <Boxes />
        </div>
    );
}