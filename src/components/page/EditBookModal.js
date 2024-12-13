import { Modal, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Field, Formik } from "formik";

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
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: bookData.name,
                        author: bookData.author,
                        imageUrl: bookData.imageUrl,
                        publisher: bookData.publisher,
                        publishDate: bookData.publishDate,
                        price: bookData.price,
                    }}
                    onSubmit={(data) => {
                        console.log(data);
                    }}
                >
                    <Form>
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
                    </Form>
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button>수정</Button>
                <Button>취소</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBookModal;
