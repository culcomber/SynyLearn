import React, {FunctionComponent, memo, useState} from 'react';

// @ts-ignore
const ListItem2: FunctionComponent<{ text, id, onMoveUp, onMoveDown }> = memo(function ListItem({text, id, onMoveUp, onMoveDown}) {
    console.log('ListItem id', id)
    return (<div>
        {/*@ts-ignore*/}
        {text}
        {/*@ts-ignore*/}
        <button onClick={() => onMoveUp(id)}>
            上移
        </button>
        {/*@ts-ignore*/}
        <button onClick={() => onMoveDown(id)}>
            下移
        </button>
    </div>)
});

function ListItem({text, id, onMoveUp, onMoveDown}) {
    console.log('ListItem id', id)
    return (<div>
        {text}
        <button onClick={() => onMoveUp(id)}>
            上移
        </button>
        <button onClick={() => onMoveDown(id)}>
            下移
        </button>
    </div>)
}

export default function List() {
    console.log('List');

    const [list, setList] = useState([...listData]);

    function handleMoveUp(id){
        if (id === 0) return;
        let newList = [...list];
        const temp = newList[id - 1];
        newList[id - 1] = newList[id];
        newList[id] = temp;
        setList(newList);
    }

    function handleMoveDown (id) {
        if (id === listData.length - 1) return;
        let newList = [...list];
        const temp = newList[id + 1];
        newList[id + 1] = newList[id];
        newList[id] = temp;
        setList(newList);
    }

    return (
        <div>
            {/*{
                list.map(({ text, id }, index) => (
                    <ListItem
                        key={id}
                        id={id}
                        text={text}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                    />
                ))
            }*/}
            {/*{
                list.map(({ text, id }, index) => (
                    <ListItem2
                        key={id}
                        id={id}
                        text={text}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                    />
                ))
            }*/}
            {
                list.map(({ text, id }, index) => (
                    <ListItem2
                        key={id}
                        id={id}
                        text={text}
                        onMoveUp={(item: any) => {
                            if (id === 0) return;
                            let newList = [...list];
                            const temp = newList[id - 1];
                            newList[id - 1] = newList[id];
                            newList[id] = temp;
                            setList(newList);
                        }}
                        onMoveDown={(item: any) => {
                            if (id === listData.length - 1) return;
                            let newList = [...list];
                            const temp = newList[id + 1];
                            newList[id + 1] = newList[id];
                            newList[id] = temp;
                            setList(newList);
                        }}
                    />
                ))
            }
        </div>
    )
}

const listData = [
    {text: '1', id: 1},
    {text: '2', id: 2},
    {text: '3', id: 3},
    {text: '4', id: 4},
/*    {text: '5', id: 5},
    {text: '6', id: 6},
    {text: '7', id: 7},
    {text: '8', id: 8},
    {text: '9', id: 9},
    {text: '10', id: 10},*/
]