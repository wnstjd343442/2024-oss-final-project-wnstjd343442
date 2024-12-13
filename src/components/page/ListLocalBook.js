import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import { Rating } from "@mui/material";
import * as library from "../api/firestore";
import ItemLocalBook from "./ItemLocalBook";
import { ChevronDown, ChevronUp, Search, Library } from "lucide-react";

const ListLocalBook = () => {
  const [localBooks, setLocalBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [author, setAuthor] = useState("");
  const [filterStar, setFilterStar] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const pageCount = useRef(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await library.getCountListLocalLibrary({
          star: filterStar,
          author,
        });
        pageCount.current = Math.ceil(count / pageSize);

        const books = await library.getListLocalLibrary(
          page,
          { star: filterStar, author },
          pageSize
        );
        setLocalBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, [page, filterStar, author]);

  const handleAuthorSearch = (e) => {
    e.preventDefault();
    const authorInput = e.target.elements.author;
    setAuthor(authorInput.value);
    setPage(1);
  };

  const pageItems = Array.from({ length: pageCount.current }, (_, i) => (
    <Pagination.Item
      key={i + 1}
      active={i + 1 === page}
      onClick={() => setPage(i + 1)}
    >
      {i + 1}
    </Pagination.Item>
  ));

  return (
    <Container className="py-4">
      <div className="mb-5">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full d-flex justify-content-between p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg border border-blue-200"
        >
          <div className="d-flex align-items-center gap-3">
            <Library size={22} />
            <span className="font-semibold text-lg">
              나만의 서재 책 검색 필터
            </span>
          </div>
          {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
          <Row className="g-4">
            <Col xs={12} md={6}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h6 className="mb-3 text-gray-700 font-semibold text-lg">
                  별점으로 필터링
                </h6>
                <Rating
                  value={filterStar}
                  onChange={(_, value) => {
                    setFilterStar(value);
                    setPage(1);
                  }}
                  size="large"
                  className="text-yellow-400"
                />
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="p-4 bg-gray-50 rounded-lg h-full">
                <h6 className="mb-3 text-gray-700 font-semibold text-lg">
                  작가 검색
                </h6>
                <Form onSubmit={handleAuthorSearch}>
                  <div className="d-flex gap-3">
                    <Form.Control
                      type="text"
                      name="author"
                      placeholder="작가 이름을 입력하세요"
                      defaultValue={author}
                      className="flex-grow"
                    />
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-white"
                    >
                      <Search size={18} />
                      <span>검색</span>
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      )}

      <Row className="g-4">
        {localBooks.map((bookData, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <ItemLocalBook bookData={bookData} setAuthor={setAuthor} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
          {pageItems}
          <Pagination.Next
            onClick={() => setPage((p) => Math.min(pageCount.current, p + 1))}
            disabled={page === pageCount.current}
          />
          <Pagination.Last
            onClick={() => setPage(pageCount.current)}
            disabled={page === pageCount.current}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default ListLocalBook;
