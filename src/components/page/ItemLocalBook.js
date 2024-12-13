import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import * as library from "./../api/firestore";

function ItemLocalBook(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <>
      <Card
        style={{
          width: "16rem",
          height: "28rem",
          margin: "auto",
        }}
        className="mb-4 shadow-sm text-center"
        onClick={() => navigate("/detail/" + props.bookData.isbn)}
      >
        <div
          style={{
            height: "18rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Card.Img
            variant="top"
            src={props.bookData.imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="text-truncate mb-2"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            {props.bookData.name}
          </Card.Title>
          <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                props.setAuthor(props.bookData.author);
              }}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              {props.bookData.author}
            </span>
            <span className="mx-1">·</span>
            <span>{props.bookData.publisher}</span>
          </Card.Text>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <Rating value={props.bookData.star} readOnly size="medium" />
            <Button
              variant="outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                setShow(true);
              }}
            >
              삭제
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>도서 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>"{props.bookData.name}"을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            취소
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              library.delLocalLibrary(props.bookData.isbn).then(() => {
                window.location.reload(true);
              });
            }}
          >
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemLocalBook;
