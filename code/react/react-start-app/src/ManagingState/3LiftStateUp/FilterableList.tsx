
import { foods, filterItems } from './data.js';
import {useState} from 'react';

export default function FilterableList() {
    const [query, setQuery] = useState('');
    // 每次render都可以刷新值
    const results = filterItems(foods, query); // 传入List的值改变

    function handleChange(e) {
        setQuery(e.target.value);
    }

    return (
        <>
            <SearchBar query={query} handleChange={handleChange}/>
            <hr />
            <List items={results}/>
        </>
    );
}

function SearchBar({query, handleChange}) {
    /*const [query, setQuery] = useState('');
    function handleChange(e) {
        setQuery(e.target.value);
    }*/

    return (
        <label>
            Search:{' '}
            <input
                value={query}
                onChange={handleChange}
            />
        </label>
    );
}

function List({ items }) {
    return (
        <table>
            <tbody>
            {items
                .map(food => (
                <tr key={food.id}>
                    <td>{food.name}</td>
                    <td>{food.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}