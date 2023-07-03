import {useRef, useState} from 'react';
import ValuesRefs from "./ValuesRefs";

export default function ChatRef() {
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);
    // let timeoutID = null;
    const timeoutRef = useRef(null);
    const textRef = useRef(text);

    function handleSend() {
        setIsSending(true);
        timeoutRef.current = setTimeout(() => {
            alert('Sending: ' + textRef.current);
            setIsSending(false);
        }, 3000);
    }

    function handleUndo() {
        setIsSending(false);
        clearTimeout(timeoutRef.current);
    }

    function handleChange(e) {
        setText(e.target.value);
        textRef.current = e.target.value;
    }

    return (
        <>
            <h4>ChatRef</h4>
            <input
                // disabled={isSending}
                value={text}
                onChange={handleChange}
            />
            <button
                disabled={isSending}
                onClick={handleSend}>
                {isSending ? 'Sending...' : 'Send'}
            </button>
            {isSending &&
              <button onClick={handleUndo}>
                Undo
              </button>
            }
        </>
    );
}
