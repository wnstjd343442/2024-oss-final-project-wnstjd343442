import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/api/firestore.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailBook from "./components/page/DetailBook.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<p>test</p>} />
            <Route path="/detail:isbn" element={<DetailBook />} />
        </Routes>
    </Router>
);
