import { Modal, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Field, Formik } from "formik";
import * as library from "./../api/firestore";
import * as Yup from "yup";

function EditBookModal(props) {
  const { bookData, show, setShow } = props;

  const BookValidationSchema = Yup.object().shape({
    name: Yup.string().required("책 제목은 필수입니다"),
    author: Yup.string().required("저자명은 필수입니다"),
    publisher: Yup.string().required("출판사는 필수입니다"),
    publishDate: Yup.date().required("출판연도는 필수입니다"),
    price: Yup.number()
      .positive("가격은 0보다 커야 합니다")
      .required("가격은 필수입니다"),
  });

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="w-100 text-center text-primary">
          책 정보 수정
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: bookData.name,
          author: bookData.author,
          imageUrl: bookData.imageUrl,
          publisher: bookData.publisher,
          publishDate: bookData.publishDate.toISOString().split("T")[0],
          price: bookData.price,
        }}
        validationSchema={BookValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          data.publishDate = new Date(data.publishDate);

          library
            .updateLocalLibrary(bookData.isbn, data)
            .then(() => {
              window.location.reload(true);
            })
            .catch((error) => {
              console.error("책 정보 수정 중 오류:", error);
              alert("책 정보 수정에 실패했습니다.");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">책 제목</Form.Label>
                    <Field
                      name="name"
                      as={Form.Control}
                      isInvalid={touched.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">저자</Form.Label>
                    <Field
                      name="author"
                      as={Form.Control}
                      isInvalid={touched.author && errors.author}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      책 표지 이미지 URL
                    </Form.Label>
                    <Field name="imageUrl" as={Form.Control} />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">출판사</Form.Label>
                    <Field
                      name="publisher"
                      as={Form.Control}
                      isInvalid={touched.publisher && errors.publisher}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.publisher}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">출판연도</Form.Label>
                    <Field
                      name="publishDate"
                      as={Form.Control}
                      type="date"
                      isInvalid={touched.publishDate && errors.publishDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.publishDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">가격</Form.Label>
                    <Field
                      name="price"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.price && errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="bg-light">
              <Button
                variant="secondary"
                onClick={() => setShow(false)}
                className="me-2"
              >
                취소
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "수정 중..." : "수정"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default EditBookModal;
