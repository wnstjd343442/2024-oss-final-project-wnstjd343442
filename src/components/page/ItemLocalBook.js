import { Card } from "react-bootstrap";

function ItemLocalBook(props) {
    return (
        <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={props.bookData.imageUrl} />
            <Card.Body>
                <Card.Title>{props.bookData.name}</Card.Title>
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ItemLocalBook;
