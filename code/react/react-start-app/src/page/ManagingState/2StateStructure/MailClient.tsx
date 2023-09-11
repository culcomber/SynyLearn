import {useState} from 'react';
import {letters} from './data.js';
import React from 'react';

function Letter({letter, onToggle, isSelected, }) {
    return (
        <li className={
            isSelected ? 'selected' : ''
        }>
            <label>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                        onToggle(letter.id);
                    }}
                />
                {letter.subject}
            </label>
        </li>
    )
}

export default function MailClient() {
    const [selectedIds, setSelectedIds] = useState([]);

    const selectedCount = selectedIds.length;

    function handleToggle(toggledId) {
        // Was it previously selected?
        // @ts-ignore
        if (selectedIds.includes(toggledId)) {
            // Then remove this ID from the array.
            setSelectedIds(selectedIds.filter(id =>
                id !== toggledId
            ));
        } else {
            // Otherwise, add this ID to the array.
            setSelectedIds([
                ...selectedIds,
                toggledId
            ]);
        }
    }

    return (
        <>
            <h2>Inbox</h2>
            <ul>
                {letters.map(letter => (
                    <Letter
                        key={letter.id}
                        letter={letter}
                        isSelected={
                            // @ts-ignore
                            selectedIds.includes(letter.id)
                        }
                        onToggle={handleToggle}
                    />
                ))}
                <hr/>
                <p>
                    <b>
                        You selected {selectedCount} letters
                    </b>
                </p>
            </ul>
        </>
    );
}