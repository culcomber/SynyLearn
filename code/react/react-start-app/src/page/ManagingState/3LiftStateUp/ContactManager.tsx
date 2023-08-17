import { useState } from 'react';
import React from 'react';

function RenderAgain() {
    const [contacts, setContacts] = useState(initialContacts);
    const [selectedId, setSelectedId] = useState(0);
    const selectedContact = contacts.find(c =>
        c.id === selectedId
    );

    function handleSave(updatedData) {
        const nextContacts = contacts.map(c => {
            if (c.id === updatedData.id) {
                return updatedData;
            } else {
                return c;
            }
        });
        setContacts(nextContacts);
    }

    return (
        <div>
            {/*contacts：渲染按钮名称 selectedId：加粗选中按钮 onSelect：控制当前选中*/}
            <ContactList
                contacts={contacts}
                selectedId={selectedId}
                onSelect={id => setSelectedId(id)}
            />
            <hr />
            {/*selectedContact：当前选中contact  onSave：更新contact*/}
            <EditContact
                initialData={selectedContact}
                onSave={handleSave}
            />
        </div>
    )
}

function Solution1() {
    const [
        contacts,
        setContacts
    ] = useState(initialContacts);
    const [
        selectedId,
        setSelectedId
    ] = useState(0);
    const selectedContact = contacts.find(c =>
        c.id === selectedId
    );

    function handleSave(updatedData) {
        const nextContacts = contacts.map(c => {
            if (c.id === updatedData.id) {
                return updatedData;
            } else {
                return c;
            }
        });
        setContacts(nextContacts);
    }

    return (
        <div>
            <ContactList
                contacts={contacts}
                selectedId={selectedId}
                onSelect={id => setSelectedId(id)}
            />
            <hr />
            <EditContact
                key={selectedId}
                initialData={selectedContact}
                onSave={handleSave}
            />
        </div>
    )
}

export default function ContactManager() {
    return (<>
        <p>上方按钮 contacts：渲染按钮名称 selectedId：加粗选中按钮 onSelect：控制当前选中<br/>
            下方表单 selectedContact：当前选中contact  onSave：更新contact<br/>
            按钮改变id，导致selectedContact改变，改变表单渲染内容<br/>
            表单改变contact，按钮根据contact渲染，改变按钮显示内容
        </p>
        <RenderAgain />
        <p>给表单增加key</p>
        <Solution1 />
    </>)
}

const initialContacts = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

function ContactList({contacts, selectedId, onSelect}) {
    return (
        <section>
            <ul>
                {contacts.map(contact =>
                    <li key={contact.id}>
                        <button onClick={() => {
                            onSelect(contact.id);
                        }}>
                            {contact.id === selectedId ?
                                <b>{contact.name}</b> :
                                contact.name
                            }
                        </button>
                    </li>
                )}
            </ul>
        </section>
    );
}

function EditContact({ initialData, onSave }) {
    const [name, setName] = useState(initialData.name);
    const [email, setEmail] = useState(initialData.email);
    return (
        <section>
            <label>
                Name:{' '}
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Email:{' '}
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <button onClick={() => {
                const updatedData = {
                    id: initialData.id,
                    name: name,
                    email: email
                };
                onSave(updatedData);
            }}>
                Save
            </button>
            <button onClick={() => {
                setName(initialData.name);
                setEmail(initialData.email);
            }}>
                Reset
            </button>
        </section>
    );
}
