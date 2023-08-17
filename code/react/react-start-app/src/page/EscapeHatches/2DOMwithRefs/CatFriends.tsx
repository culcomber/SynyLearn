import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './CatFriends.css'
import React from 'react';

export default function CatFriends() {
    const selectedRef = useRef(null);
    const [index, setIndex] = useState(0);

    return (
        <>
            <h4>flushSync同步更新state</h4>
            <p>state是index，点击按钮同步更新state和dom，渲染列表，当index和列表图片的index相同时，那个图片添加ref属性，操作ref让图片居中</p>
            <nav>
                <button onClick={() => {
                    flushSync(() => {
                        if (index < catList.length - 1) {
                            setIndex(index + 1);
                        } else {
                            setIndex(0);
                        }
                    });
                    selectedRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }}>
                    Next
                </button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat, i) => (
                        <li
                            key={cat.id}
                            ref={index === i ?
                                selectedRef :
                                null
                            }
                        >
                            <img
                                className={
                                    index === i ?
                                        'active'
                                        : ''
                                }
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