import useIntervalAsync from "../hooks/useIntervalAsync";
import {useRef} from "react";

function Polling () {
    const timeRef = useRef(1);
    const doRequest = () => {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            console.log('doRequest', timeRef.current)
            if (timeRef.current <= 5) {
                setTimeout(() => resolve(), 500);
            } else {
                setTimeout(() => reject(), 500);
            }
        }).then(() => {
            console.log('resolve');
            timeRef.current++;
        }).catch(() => {
            console.log('reject');
            end();
        })
    };
    const [start, flush, end] =  useIntervalAsync(doRequest, 2000);

    return (<>
        <p onClick={start}>start</p>
        <p onClick={flush}>flush</p>
        <p onClick={end}>end</p>
    </>)
}

export default Polling;