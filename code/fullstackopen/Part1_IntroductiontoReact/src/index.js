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
import Unicafe from "./unicafe/Unicafe";
import Courseinfo from "./courseinfo/Courseinfo";
import Anecdotes from "./anecdotes/Anecdotes";
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
