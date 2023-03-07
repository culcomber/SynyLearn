import {useState} from "react";

const Filter = () => {

}

const PersonForm = () => {

}

const Persons = () => {

}

function Phonebook() {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter />

            <h3>Add a new</h3>

            <PersonForm />

            <h3>Numbers</h3>

            <Persons />
        </div>
    )
}

export default Phonebook;