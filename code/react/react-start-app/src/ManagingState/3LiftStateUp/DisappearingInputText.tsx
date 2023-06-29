import { useState } from 'react';

function RenderAgain() {
    const [showHint, setShowHint] = useState(false);
    if (showHint) {
        return (
            <div>
                <p><i>Hint: Your favorite city?</i></p>
                <Form />
                <button onClick={() => {
                    setShowHint(false);
                }}>Hide hint</button>
            </div>

        );
    }
    return (
        <div>
            <Form />
            <button onClick={() => {
                setShowHint(true);
            }}>Show hint</button>
        </div>
    );
}

function Solution1() {
    const [showHint, setShowHint] = useState(false);
    return (
        <div>
            {showHint &&
              <p><i>Hint: Your favorite city?</i></p>
            }
            <Form />
            {showHint ? (
                <button onClick={() => {
                    setShowHint(false);
                }}>Hide hint</button>
            ) : (
                <button onClick={() => {
                    setShowHint(true);
                }}>Show hint</button>
            )}
        </div>
    );
}

function Solution2() {
    const [showHint, setShowHint] = useState(false);
    if (showHint) {
        return (
            <div>
                <p><i>Hint: Your favorite city?</i></p>
                <Form />
                <button onClick={() => {
                    setShowHint(false);
                }}>Hide hint</button>
            </div>
        );
    }
    return (
        <div>
            {null}
            <Form />
            <button onClick={() => {
                setShowHint(true);
            }}>Show hint</button>
        </div>
    );
}

export default function DisappearingInputText() {
    return (<>
        <p>会重新渲染 <br />
            if (showHint) &lt;div&gt; &lt;p&gt; &lt;/p&gt; &lt;Form/&gt; &lt;/div&gt;<br />
            else &lt;div&gt; &lt;Form/&gt; &lt;/div&gt;
        </p>
        <RenderAgain />
        <p>不会重新渲染 <br /> {`{showHint && <p><i>Hint: Your favorite city?</i></p>}`}</p>
        <Solution1 />
        <p>"不会重新渲染" <br />
            if (showHint) &lt;div&gt; &lt;p&gt; &lt;/p&gt; &lt;Form/&gt; &lt;/div&gt;<br />
            else &lt;div&gt; {`{null}`} &lt;Form/&gt; &lt;/div&gt;
        </p>
        <Solution2 />
    </>)
}

function Form() {
    const [text, setText] = useState('');
    return (
        <textarea
            value={text}
            onChange={e => setText(e.target.value)}
        />
    );
}