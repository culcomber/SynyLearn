import { useState } from 'react';
import React from 'react';

function RenderAgain() {
    const [index, setIndex] = useState(0);
    const hasNext = index < images.length - 1;

    function handleClick() {
        if (hasNext) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }

    let image = images[index];
    return (
        <>
            <button onClick={handleClick}>
                Next
            </button>
            <h3>
                Image {index + 1} of {images.length}
            </h3>
            <img width={200} height={200} src={image.src} />
            <p>
                {image.place}
            </p>
        </>
    );
}

function Solution1() {
    const [index, setIndex] = useState(0);
    const hasNext = index < images.length - 1;

    function handleClick() {
        if (hasNext) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }

    let image = images[index];
    return (
        <>
            <button onClick={handleClick}>
                Next
            </button>
            <h3>
                Image {index + 1} of {images.length}
            </h3>
            <img width={200} height={200} key={image.src} src={image.src} />
            <p>
                {image.place}
            </p>
        </>
    );
}

export default function Gallery() {
    return (<>
        <p>当你按下 "下一步 "时，浏览器开始加载下一张图片。然而，由于它显示在同一个位置的img标签中，
            在默认情况下，仍然会看到前一张图片，直到下一张图片加载</p>
        <RenderAgain />
        <p>img标签添加key。当这个键改变时，React将从头开始重新创建imgDOM节点</p>
        <Solution1 />
    </>)
}

let images = [{
    place: 'Penang, Malaysia',
    src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
    place: 'Lisbon, Portugal',
    src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
    place: 'Bilbao, Spain',
    src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
    place: 'Valparaíso, Chile',
    src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
    place: 'Schwyz, Switzerland',
    src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
    place: 'Prague, Czechia',
    src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
    place: 'Ljubljana, Slovenia',
    src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
