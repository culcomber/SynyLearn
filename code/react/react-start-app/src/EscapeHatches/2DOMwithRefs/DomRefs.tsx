import {forwardRef, useImperativeHandle, useRef} from 'react';

export default function DomRefs() {

    function InputFocus() {
        // 顶层使用useRef，getMap中在条件语句设置值，li标签中传递给ref一个函数，函数中调用getMap
        const inputRef = useRef(null);
        const inputComRef = useRef(null);
        const inputComRefFunc = useRef(null);

        function handleClick() {
            inputRef.current.focus();
        }

        return (<>
            <h4>Focus to an input</h4>
            <input ref={inputRef} />
            <button onClick={handleClick}>
                Focus the input
            </button>
            <br/><br/>


            <h4>Focus to an function component</h4>
            <p>{`const MyInput = forwardRef((props, ref) => {
                return <input {...props} ref={ref} />;
            })`}</p>
            <MyInput ref={inputComRef} />
            <button onClick={() => {inputComRef.current.focus();}}>
                Focus the input
            </button>
            <br/><br/>

            <h4>Focus to an function component to call function</h4>
            <p>{`useImperativeHandle(ref, () => ({ 
                    focus: func; 
                }))`}</p>
            <MyInputFunc ref={inputComRefFunc} />
            <button onClick={() => {inputComRefFunc.current.focus();}}>
                Focus the input
            </button>
        </>)
    }

    const MyInput = forwardRef((props, ref) => {
        // @ts-ignore
        return <input {...props} ref={ref} />;
    });

    const MyInputFunc = forwardRef((props, ref) => {
        const realInputRef = useRef(null);
        useImperativeHandle(ref, () => ({
            // Only expose focus and nothing else
            focus() {
                realInputRef.current.focus();
            },
        }));
        return <input {...props} ref={realInputRef} />;
    });

    function CatFriends() {
        const itemsRef = useRef(null);

        function scrollToId(itemId) {
            const map = getMap();
            const node = map.get(itemId);
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }

        function getMap() {
            if (!itemsRef.current) {
                // Initialize the Map on first usage.
                itemsRef.current = new Map();
            }
            return itemsRef.current;
        }

        return (
            <>
                <h4>Scrolling to an element</h4>
                <nav style={{textAlign: 'center'}}>
                    <button onClick={() => scrollToId(0)}>
                        Tom
                    </button>
                    <button onClick={() => scrollToId(5)}>
                        Maru
                    </button>
                    <button onClick={() => scrollToId(9)}>
                        Jellylorum
                    </button>
                </nav>
                <div style={{
                    width: '870px',
                    height: '300px',
                    overflow: 'hidden',
                }}>
                    {/* Hooks must only be called at the top-level of your component.
                    <ul>
                      {items.map((item) => {
                        // Doesn't work!
                        const ref = useRef(null);
                        return <li ref={ref} />;
                      })}
                    </ul>*/}
                    <ul>
                        {catList.map(cat => (
                            <li
                                key={cat.id}
                                // React会在设置ref的时候用DOM节点调用函数，在清除ref的时候用null调用
                                ref={(node) => {
                                    // node --> li
                                    const map = getMap();
                                    if (node) {
                                        map.set(cat.id, node);
                                    } else {
                                        map.delete(cat.id);
                                    }
                                }}
                                style={{
                                    listStyle: 'none',
                                    whiteSpace: 'nowrap',
                                    display: 'inline',
                                    padding: '0.5rem',
                                }}
                            >
                                <img
                                    src={cat.imageUrl}
                                    alt={'Cat #' + cat.id}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }

    const catList = [];
    for (let i = 0; i < 10; i++) {
        catList.push({
            id: i,
            imageUrl: 'https://placekitten.com/250/200?image=' + i
        });
    }

    return (
        <>
            <InputFocus/>
            <br/><br/>
            <CatFriends/>
        </>
    );
}
