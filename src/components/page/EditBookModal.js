import { Modal, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Field, Formik } from "formik";
import * as library from "./../api/firestore";

function EditBookModal(props) {
    const bookData = props.bookData;
    return (
        <Modal
            show={props.show}
            onHide={() => {
                props.setShow(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>책 정보 수정</Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={{
                    name: bookData.name,
                    author: bookData.author,
                    imageUrl: bookData.imageUrl,
                    publisher: bookData.publisher,
                    publishDate: bookData.publishDate
                        .toISOString()
                        .split("T")[0],
                    price: bookData.price,
                }}
                onSubmit={(data) => {
                    data.publishDate = new Date(data.publishDate);
                    console.log(data);
                    library.updateLocalLibrary(bookData.isbn, data).then(() => {
                        window.location.reload(true);
                    });
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>책 제목</Form.Label>
                                <Field name="name" as={Form.Control} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>저자</Form.Label>
                                <Field name="author" as={Form.Control} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>책 표지 이미지 url</Form.Label>
                                <Field name="imageUrl" as={Form.Control} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>출판사</Form.Label>
                                <Field name="publisher" as={Form.Control} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>출판연도</Form.Label>
                                <Field
                                    name="publishDate"
                                    as={Form.Control}
                                    type="date"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>가격</Form.Label>
                                <Field name="price" as={Form.Control} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">수정</Button>
                            <Button
                                onClick={() => {
                                    props.setShow(false);
                                }}
                            >
                                취소
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default EditBookModal;
