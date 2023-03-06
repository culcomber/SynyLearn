import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Unicafe from "./Part1/unicafe/Unicafe";
import Courseinfo from "./Part1/courseinfo/Courseinfo";
import Anecdotes from "./Part1/anecdotes/Anecdotes";
import Countries from "./Part2/countries/Countries";
import Coursecontents from "./Part2/coursecontents/Coursecontents";
import Phonebook from "./Part2/phonebook/Phonebook";
// import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "unicafe",
        element: <Unicafe/>,
    },
    {
        path: "courseinfo",
        element: <Courseinfo/>,
    },
    {
        path: "anecdotes",
        element: <Anecdotes/>,
    },
    {
        path: "countries",
        element: <Countries/>,
    },
    {
        path: "coursecontents",
        element: <Coursecontents/>,
    },
    {
        path: "phonebook",
        element: <Phonebook/>,
    },
]);

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);*/

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

/*If you want to start measuring performance in your app, pass a function
to log results (for example: reportWebVitals(console.log))
or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
