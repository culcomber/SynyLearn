import React from "react";
import useDogImages from "./useDogImages";

/*export default function DogImagesHook(): JSX.Element[] {
    const dogs = useDogImages();

    return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}*/


const DogImagesHook = () => {
    const dogs = useDogImages();

    /* Type 'Element[]' is missing the following properties from type 'Element'
    You could always just send back a single JSX.Element as a fragment, too:
    *  */
    return <>{dogs.map((dog, i) => <img src={dog} key={i} alt="Dog"/>)}</>;
}

export default DogImagesHook;

