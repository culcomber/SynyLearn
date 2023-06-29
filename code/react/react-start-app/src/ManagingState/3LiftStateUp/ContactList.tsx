import { useState } from 'react';

function RenderAgain() {
    const [reverse, setReverse] = useState(false);

    const displayedContacts = [...contacts];
    if (reverse) {
        displayedContacts.reverse();
    }

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    // @ts-ignore
                    value={reverse}
                    onChange={e => {
                        setReverse(e.target.checked)
                    }}
                />{' '}
                Show in reverse order
            </label>
            <ul>
                {displayedContacts.map((contact, i) =>
                    <li key={i}>
                        <Contact contact={contact} />
                    </li>
                )}
            </ul>
        </>
    );
}

function Solution1() {
    const [reverse, setReverse] = useState(false);

    const displayedContacts = [...contacts];
    if (reverse) {
        displayedContacts.reverse();
    }

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    // @ts-ignore
                    value={reverse}
                    onChange={e => {
                        setReverse(e.target.checked)
                    }}
                />{' '}
                Show in reverse order
            </label>
            <ul>
                {displayedContacts.map(contact =>
                    <li key={contact.id}>
                        <Contact contact={contact} />
                    </li>
                )}
            </ul>
        </>
    );
}

export default function ContactList() {
    return (<>
        <p>是否展开由子组件Contact的state的expanded控制，如果用遍历的index，反转之后state没有更新</p>
        <RenderAgain />
        <p>key使用数据里面的id，反转之后，相应组件我位置也会调整</p>
        <Solution1 />
    </>)
}

function Contact({ contact }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <>
            <p><b>{contact.name}</b></p>
            {expanded &&
              <p><i>{contact.email}</i></p>
            }
            <button onClick={() => {
                setExpanded(!expanded);
            }}>
                {expanded ? 'Hide' : 'Show'} email
            </button>
        </>
    );
}

const contacts = [
    { id: 0, name: 'Alice', email: 'alice@mail.com' },
    { id: 1, name: 'Bob', email: 'bob@mail.com' },
    { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
