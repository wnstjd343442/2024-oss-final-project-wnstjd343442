import { Container, Row, Col, Pagination } from "react-bootstrap";
import * as library from "../api/firestore";
import ItemLocalBook from "./ItemLocalBook";
import { useState, useEffect, useRef } from "react";
import { Rating } from "@mui/material";

function ListLocalBook() {
    const [localBooks, setLocalBooks] = useState([]);
    const [page, setPage] = useState(1);
    const pageCount = useRef(1);
    const [filterStar, setFilterStar] = useState(0);
    const pageSize = 12;

    useEffect(() => {
        library.getCountListLocalLibrary(filterStar).then((res) => {
            pageCount.current = Math.ceil(res / pageSize);
            console.log(res);
        });
        library.getListLocalLibrary(page, filterStar, pageSize).then((res) => {
            setLocalBooks(res);
        });
    }, [page, filterStar]);

    let pageItem = [];
    for (let i = 1; i <= pageCount.current; i++) {
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
                <div className="d-flex flex-row-reverse">
                    <div className="border p-2">
                        <span className="align-top">몇 점 이상: </span>
                        <Rating
                            value={filterStar}
                            onChange={(event, value) => {
                                setFilterStar(value);
                            }}
                        />
                    </div>
                </div>
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        onClick={() => {
                            if (page > 1) setPage(page - 1);
                        }}
                    />
                    {pageItem}
                    <Pagination.Next
                        onClick={() => {
                            if (page < pageCount.current) setPage(page + 1);
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
