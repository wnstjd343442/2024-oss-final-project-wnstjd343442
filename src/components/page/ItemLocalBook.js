import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import Header from "./Header";

function ItemLocalBook(props) {
    const navigate = useNavigate();

    return (
        <Card
            style={{ width: "20rem" }}
            onClick={() => {
                navigate("/detail/" + props.bookData.isbn);
            }}
        >
            <Card.Img variant="top" src={props.bookData.imageUrl} />
            <Card.Body>
                <Card.Title>{props.bookData.name}</Card.Title>
                <Card.Text className="text-secondary">
                    {props.bookData.author} · {props.bookData.publisher}
                </Card.Text>
                <Rating value={props.bookData.star} readOnly />
                <Button variant="outline-danger" className="float-end">
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ItemLocalBook;
