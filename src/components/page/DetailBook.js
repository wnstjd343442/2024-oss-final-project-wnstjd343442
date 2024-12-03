import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as library from "../api/firestore";
import { Rating } from "@mui/material";

//디자인 참조할 곳 https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=291370219

function DetailBook() {
    const bookIsbn = useParams();

    const [bookData, setBookData] = useState({
        name: "제목없음",
        author: "작가 미상",
        publishData: "출판연도 미상",
        publisher: "출판사 없음",
        isbn: "없음",
        price: "없음",
        imageUrl: "/public/no-image.svg",
        star: 0,
        memo: "",
    });

    const [value, setValue] = useState(3);

    useEffect(() => {
        library.getLocalLibrary().then((res) => setBookData(res[0]));
    }, []);

    return (
        <div>
            <h1 className="text-center my-2">상품 상세 보기</h1>
            <Container>
                <Row>
                    <Col>
                        <Image
                            src={
                                bookData.hasOwnProperty("imageUrl")
                                    ? bookData.imageUrl
                                    : "/public/no-image.svg"
                            }
                        />
                    </Col>
                    <Col>
                        <Row>
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
                                    <Col>{bookData.publishData}</Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={2}>가격</Col>
                                    <Col>{bookData.price}</Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Rating
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailBook;
