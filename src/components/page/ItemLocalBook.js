import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import * as library from "./../api/firestore";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function ItemLocalBook(props) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    return (
        <div>
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
                        <span
                            onClick={(event) => {
                                event.stopPropagation();
                                props.setAuthor(props.bookData.author);
                            }}
                            className="link-primary"
                        >
                            {props.bookData.author}
                        </span>
                        <span> · {props.bookData.publisher}</span>
                    </Card.Text>
                    <Rating value={props.bookData.star} readOnly />
                    <Button
                        variant="outline-danger"
                        className="float-end"
                        onClick={(event) => {
                            event.stopPropagation();
                            setShow(true);
                        }}
                    >
                        Delete
                    </Button>
                </Card.Body>
            </Card>
            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>상품 삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>"{props.bookData.name}"을 삭제하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-danger"
                        onClick={() => {
                            library
                                .delLocalLibrary(props.bookData.isbn)
                                .then(() => {
                                    window.location.reload(true);
                                });
                        }}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        뒤로
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ItemLocalBook;
