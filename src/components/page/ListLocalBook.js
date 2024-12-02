import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { getLocalLibrary } from "../api/firestore";
import { useState, useEffect } from "react";

function ListLocalBook() {
    const [localBooks, setLocalBooks] = useState([]);
    const [page, setPage] = useState(1);

    //count 12 page 1

    return (
        <div>
            <Container></Container>
        </div>
    );
}
