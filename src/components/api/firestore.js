import axios from "axios";

async function getLocalLibrary() {
    let res = await axios.get(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library"
    );

    return res.data.documents.map((d) => otd(d));
}
async function putLocalLibrary(bookData) {
    let res = axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library",
        dto(bookData)
    );

    return res;
}

function dto(bookData) {
    return {
        fields: {
            name: { stringValue: bookData.name },
            author: { stringValue: bookData.author },
            publishDate: { timestampValue: bookData.publishDate },
            publisher: { stringValue: bookData.publisher },
            isbn: { integerValue: bookData.isbn },
            price: { integerValue: bookData.price },
            imageUrl: { stringValue: bookData.imageUrl },
            star: { integerValue: bookData.star },
            memo: { stringValue: bookData.memo },
        },
    };
}

function otd(objectData) {
    let bookData = {
        name: objectData.fields.name.stringValue,
        author: objectData.fields.author.stringValue,
        publishDate: objectData.fields.publishDate.timestampValue,
        publisher: objectData.fields.publisher.stringValue,
        isbn: objectData.fields.isbn.integerValue,
        price: objectData.fields.price.integerValue,
        imageUrl: objectData.fields.imageUrl.stringValue,
        star: objectData.fields.star.integerValue,
        memo: objectData.fields.memo.stringValue,
    };

    return bookData;
}

export { getLocalLibrary, putLocalLibrary };
