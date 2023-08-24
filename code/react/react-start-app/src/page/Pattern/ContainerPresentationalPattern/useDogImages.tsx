import { useState, useEffect } from "react";

export default function useDogImages() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        // useEffect中使用异步
        async function fetchDogs() {
            const res = await fetch(
                "https://dog.ceo/api/breed/labrador/images/random/6"
            );
            const { message } = await res.json();
            setDogs(message);
        }
        fetchDogs();
    }, []);

    return dogs;
}