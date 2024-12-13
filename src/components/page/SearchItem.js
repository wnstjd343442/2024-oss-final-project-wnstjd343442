import React, { useState } from "react";
import { BookOpen, Calendar, Building2, Barcode } from "lucide-react";
import "./../css/SearchItem.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as library from "../api/firestore";

const SearchItem = ({
  thumbnail,
  title,
  author,
  isbn,
  publisher,
  datetime,
  price,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [memo, setMemo] = useState("");
  const [rating, setRating] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return "유효하지 않은 날짜";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (error) {
      return "날짜 형식 오류";
    }
  };

  const handleAddToLibrary = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    const bookData = {
      imageUrl: thumbnail,
      name: title,
      author: author[0],
      isbn: isbn.split(" ").pop(),
      publisher,
      publishDate: new Date(datetime),
      memo,
      star: rating,
      price,
    };

    library
      .createLocalLibrary(bookData)
      .then(() => {
        alert("책이 성공적으로 저장되었습니다!");
        window.location.reload();
      })
      .catch(() => {
        alert("저장 중 문제가 발생하였습니다.");
      });

    setShowModal(false);
    setMemo("");
    setRating(0);
  };

  return (
    <>
      <div className="card-container">
        <div className="image-wrapper">
          <img
            className="image"
            src={thumbnail || "/api/placeholder/200/300"}
            alt={title || "책 표지"}
          />
        </div>
        <div className="info-container">
          <h3 className="title">{title}</h3>
          <div className="book-metadata">
            <div className="metadata-item">
              <BookOpen size={16} className="metadata-icon" />
              <span>{author || "저자 정보 없음"}</span>
            </div>
            <div className="metadata-item">
              <Calendar size={16} className="metadata-icon" />
              <span>{formatDate(datetime)}</span>
            </div>
            <div className="metadata-item">
              <Building2 size={16} className="metadata-icon" />
              <span>{publisher || "출판사 정보 없음"}</span>
            </div>
            <div className="metadata-item">
              <Barcode size={16} className="metadata-icon" />
              <span>{isbn || "ISBN 정보 없음"}</span>
            </div>
          </div>
          <button
            className="add-to-library-btn btn btn-primary"
            onClick={handleAddToLibrary}
          >
            서재에 추가하기
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">책 추가하기</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="memo">메모</label>
                  <textarea
                    id="memo"
                    className="form-control"
                    rows="3"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="rating">별점</label>
                  <select
                    id="rating"
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value="0">선택</option>
                    <option value="1">1점</option>
                    <option value="2">2점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchItem;
