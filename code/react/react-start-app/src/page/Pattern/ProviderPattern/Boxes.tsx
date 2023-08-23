import React from "react";
import ListItem from "./ListItem";

export default function Boxes() {
    return (
        <ul className="list">
            {new Array(3).fill(0).map((x, i) => (
                <ListItem key={i} />
            ))}
        </ul>
    );
}
