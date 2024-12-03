import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/api/firestore.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailBook from "./components/page/DetailBook.js";
import ListLocalBook from "./components/page/ListLocalBook.js";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<ListLocalBook />} />
            <Route path="/detail/:isbn" element={<DetailBook />} />
        </Routes>
    </Router>
);
