import { Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap";

function EditBookModal(props) {
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
                <Form>
                    <Form.Group>
                        <Form.Label>책 제목</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.bookData.name}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>저자</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.bookData.author}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>출판사</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.bookData.publisher}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>출판연도</Form.Label>
                        <Form.Control
                            type="date"
                            value={props.bookData.publishDate}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>가격</Form.Label>
                        <Form.Control
                            type="Number"
                            value={props.bookData.price}
                        ></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditBookModal;
