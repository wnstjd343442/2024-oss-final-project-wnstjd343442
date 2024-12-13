import { Container, Row, Col, Pagination } from "react-bootstrap";
import * as library from "../api/firestore";
import ItemLocalBook from "./ItemLocalBook";
import { useState, useEffect, useRef } from "react";

function ListLocalBook() {
    const [localBooks, setLocalBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        library.getCountListLocalLibrary().then((res) => {
            setPageCount(Math.ceil(res / pageSize));
        });
    }, []);
    useEffect(() => {
        library.getListLocalLibrary(page, pageSize).then((res) => {
            setLocalBooks(res);
        });
    }, [page]);

    let pageItem = [];
    for (let i = 1; i <= pageCount; i++) {
        pageItem.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => {
                    setPage(i);
                }}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <Container className="my-5">
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        onClick={() => {
                            if (page > 1) setPage(page - 1);
                        }}
                    />
                    {pageItem}
                    <Pagination.Next
                        onClick={() => {
                            if (page < pageCount) setPage(page + 1);
                        }}
                    />
                </Pagination>

                <Row className="g-5">
                    {localBooks.map((bookData, index) => (
                        <Col key={index} xs={3}>
                            <ItemLocalBook bookData={bookData} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ListLocalBook;
