import {
    Container,
    Row,
    Col,
    Image,
    Form,
    Button,
    Placeholder,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as library from "../api/firestore";
import { Rating } from "@mui/material";
import EditBookModal from "./EditBookModal";

//디자인 참조할 곳 https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=291370219

function DetailBook() {
    let { isbn } = useParams();
    const [bookData, setBookData] = useState({
        name: "제목없음",
        author: "작가 미상",
        publishDate: "출판연도 미상",
        publisher: "출판사 없음",
        isbn: undefined,
        price: "없음",
        imageUrl: "/public/no-image.svg",
        star: 0,
        memo: "",
    });
    useEffect(() => {
        library.getLocalLibrary(isbn).then((res) => setBookData(res));
    }, []);

    const [editModalShow, setEditModalShow] = useState(false);

    return (
        <div>
            <h1 className="text-center my-5">상품 상세 보기</h1>
            <Container className="p-5">
                <Row>
                    <Col>
                        <Image
                            src={
                                bookData.hasOwnProperty("imageUrl")
                                    ? bookData.imageUrl
                                    : "/public/no-image.svg"
                            }
                            thumbnail
                        />
                    </Col>
                    <Col>
                        <Row className="gy-2">
                            <Col xs={12}>
                                <Button
                                    as={Link}
                                    to="/"
                                    className="float-end m-2"
                                >
                                    뒤로
                                </Button>
                                <Button
                                    className="float-end mt-2"
                                    onClick={() => {
                                        setEditModalShow(true);
                                    }}
                                >
                                    수정
                                </Button>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={2}>제목</Col>
                                    <Col>{bookData.name}</Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={2}>작가</Col>
                                    <Col>{bookData.author}</Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={2}>출판사</Col>
                                    <Col>{bookData.publisher}</Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={2}>출판연도</Col>
                                    <Col>
                                        {new Date(
                                            bookData.publishDate
                                        ).toDateString()}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={2}>가격</Col>
                                    <Col>{bookData.price}</Col>
                                </Row>
                            </Col>
                            <Col xs={2}>별점</Col>
                            <Col xs={10}>
                                <Rating
                                    value={bookData.star}
                                    onChange={(event, new_star) => {
                                        library
                                            .updateLocalLibrary(bookData.isbn, {
                                                star: new_star,
                                            })
                                            .then(
                                                setBookData((prev) => ({
                                                    ...prev,
                                                    star: new_star,
                                                }))
                                            );
                                    }}
                                />
                            </Col>
                            <Col>
                                <Form
                                    className="position-relative"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        let new_memo =
                                            event.currentTarget[0].value;
                                        library
                                            .updateLocalLibrary(bookData.isbn, {
                                                ...bookData,
                                                memo: new_memo,
                                            })
                                            .then(() => {
                                                alert("메모를 저장하였습니다.");
                                            });
                                    }}
                                >
                                    <Form.Group>
                                        <Form.Label>Memo</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            style={{ height: "400px" }}
                                            placeholder="여기에 메모하세요"
                                            defaultValue={bookData.memo}
                                            name="memo"
                                        />
                                    </Form.Group>
                                    <Button
                                        className="position-absolute bottom-0 end-0 m-2"
                                        variant="outline-primary"
                                        type="submit"
                                    >
                                        메모 저장
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            {bookData.isbn != undefined ? (
                <EditBookModal
                    show={editModalShow}
                    setShow={setEditModalShow}
                    bookData={bookData}
                />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default DetailBook;
