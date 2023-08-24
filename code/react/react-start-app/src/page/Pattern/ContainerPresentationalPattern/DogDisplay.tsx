import React from "react";
import DogImagesContainer from "./DogImagesContainer";
import "./DogDisplay.css";
import DogImagesHook from "./DogImagesHook";

export default function DogDisplay() {
    // @ts-ignore
    return (
        <div className="DogDisplayApp">
            <h1>
                Browse Dog Images{" "}
                <span role="img" aria-label="emoji"></span>
            </h1>
            <p>Container/Presentational Pattern</p>
            <DogImagesContainer />

            <p>Hook</p>
            <DogImagesHook />
        </div>
    );
}