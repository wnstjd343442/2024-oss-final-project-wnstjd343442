import { Card } from "react-bootstrap";

function ItemLocalBook(props) {
    return (
        <Card>
            <Card.Img variant="top" src={props.src} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
}
