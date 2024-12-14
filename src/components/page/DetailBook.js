import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as library from "../api/firestore";
import { Rating } from "@mui/material";
import EditBookModal from "./EditBookModal";

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

    const [isLoading, setIsLoading] = useState(true);
    const [editModalShow, setEditModalShow] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        library
            .getLocalLibrary(isbn)
            .then((res) => {
                setBookData(res);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("책 정보를 불러오는 중 오류 발생:", error);
                setIsLoading(false);
            });
    }, [isbn]);

    const handleStarChange = (event, newStar) => {
        library
            .updateLocalLibrary(bookData.isbn, { star: newStar })
            .then(() => setBookData((prev) => ({ ...prev, star: newStar })))
            .catch((error) => {
                console.error("별점 업데이트 중 오류 발생:", error);
                alert("별점 저장에 실패했습니다.");
            });
    };

    const handleMemoSubmit = (event) => {
        event.preventDefault();
        const new_memo = event.currentTarget[0].value;

        library
            .updateLocalLibrary(bookData.isbn, {
                ...bookData,
                memo: new_memo,
            })
            .then(() => {
                alert("메모를 성공적으로 저장했습니다.");
            })
            .catch((error) => {
                console.error("메모 저장 중 오류 발생:", error);
                alert("메모 저장에 실패했습니다.");
            });
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light py-5">
            <Container>
                <div className="bg-white shadow-lg rounded-4 overflow-hidden">
                    <Row className="g-0">
                        {/* 왼쪽 이미지 섹션 */}
                        <Col
                            md={4}
                            className="p-4 text-center bg-light d-flex align-items-center justify-content-center"
                        >
                            <Image
                                src={
                                    bookData.imageUrl || "/public/no-image.svg"
                                }
                                fluid
                                rounded
                                className="w-100 object-cover shadow-lg"
                                style={{
                                    maxWidth: "500px",
                                    maxHeight: "600px",
                                    objectFit: "cover",
                                }}
                            />
                        </Col>

                        {/* 오른쪽 상세 정보 섹션 */}
                        <Col md={8} className="p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <h2 className="mb-0 text-dark">
                                    {bookData.name}
                                </h2>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        className="me-2"
                                        onClick={() => setEditModalShow(true)}
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        as={Link}
                                        to="/"
                                        variant="outline-secondary"
                                    >
                                        뒤로
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-3 text-muted">
                                <div className="d-flex mb-2 align-items-center">
                                    <span className="fw-bold me-3 text-dark">
                                        작가
                                    </span>
                                    <span>{bookData.author}</span>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <span className="fw-bold me-3 text-dark">
                                        출판사
                                    </span>
                                    <span>{bookData.publisher}</span>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <span className="fw-bold me-3 text-dark">
                                        출판연도
                                    </span>
                                    <span>
                                        {bookData.publishDate
                                            ? new Date(
                                                  bookData.publishDate
                                              ).getFullYear()
                                            : "미상"}
                                    </span>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <span className="fw-bold me-3 text-dark">
                                        가격
                                    </span>
                                    <span>{bookData.price}</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <span className="fw-bold me-3 text-dark">
                                    별점
                                </span>
                                <Rating
                                    value={bookData.star}
                                    precision={0.5}
                                    onChange={handleStarChange}
                                />
                            </div>

                            <Form onSubmit={handleMemoSubmit}>
                                <Form.Group>
                                    <Form.Label className="fw-bold">
                                        메모
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={8}
                                        placeholder="여기에 메모하세요"
                                        defaultValue={bookData.memo}
                                        name="memo"
                                        className="mb-3"
                                    />
                                    <Button variant="primary" type="submit">
                                        메모 저장
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>

            {bookData.isbn && (
                <EditBookModal
                    show={editModalShow}
                    setShow={setEditModalShow}
                    bookData={bookData}
                />
            )}
        </div>
    );
}

export default DetailBook;
