import axios from "axios";

async function getLocalLibrary() {
    let res = await axios.get(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library"
    );

    return res.data.documents.map((d) => dto(d));
}
async function putLocalLibrary(book_data) {
    let res = axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library",
        dto(book_data)
    );

    return res;
}

function dto(book_data) {
    return {
        fields: {
            name: { stringValue: book_data.name },
            author: { stringValue: book_data.author },
            publish_date: { timestampValue: book_data.publish_date },
            publisher: { stringValue: book_data.publisher },
            isbn: { integerValue: book_data.isbn },
            price: { integerValue: book_data.price },
            image_url: { stringValue: book_data.image_url },
            star: { integerValue: book_data.star },
            memo: { stringValue: book_data.memo },
        },
    };
}

function otd(object_data) {
    let book_data = {
        name: object_data.fields.name.stringValue,
        author: object_data.fields.author.stringValue,
        publish_date: object_data.fields.publish_date.timestampValue,
        publisher: object_data.fields.publisher.stringValue,
        isbn: object_data.fields.isbn.integerValue,
        price: object_data.fields.price.integerValue,
        image_url: object_data.fields.image_url.stringValue,
        star: object_data.fields.star.integerValue,
        memo: object_data.fields.memo.stringValue,
    };

    return book_data;
}

export { getLocalLibrary, putLocalLibrary };
