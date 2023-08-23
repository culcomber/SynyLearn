import React from "react";

export default function Toggle() {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="slider round" />
        </label>
    );
}