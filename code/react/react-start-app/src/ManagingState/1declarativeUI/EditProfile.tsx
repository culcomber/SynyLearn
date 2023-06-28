import {useState} from "react";

export default function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('Jane');
    const [secondName, setSecondName] = useState('Jacobs');

    return (
        <>
            <h4 className={'title-color'}> EditProfile </h4>
            <form onSubmit={e => {
                e.preventDefault();
                setIsEditing(!isEditing);
            }}>
                <label>
                    First name:{' '}
                    {isEditing
                        ? <input value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        : <b>{firstName}</b>
                    }
                </label>
                <label>
                    Last name:{' '}
                    {isEditing
                        ? <input value={secondName} onChange={e => setSecondName(e.target.value)}/>
                        : <b>{secondName}</b>
                    }
                </label>
                <button type="submit">
                    {isEditing ? 'Sava' : 'Edit'} Profile
                </button>
                <p><i>Hello, {firstName} {secondName}!</i></p>
            </form>
        </>
    );
}