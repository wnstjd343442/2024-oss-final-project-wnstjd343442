import axios from "axios";

async function getLocalLibrary(isbn) {
    let res = await axios.get(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library/" + isbn
    );

    return otd(res.data);
}
async function putLocalLibrary(bookData) {
    let res = axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library",
        dto(bookData)
    );

    return res;
}

async function getListLocalLibrary(page, pageSize = 12) {
    const res = await axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents:runQuery",
        {
            structuredQuery: {
                offset: (page - 1) * 12,
                limit: pageSize,
            },
        }
    );

    if (page > 1) return res.data.slice(1).map((o) => otd(o.document));
    else return res.data.map((o) => otd(o.document));
}

async function getCountListLocalLibrary() {
    const res = await axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents:runAggregationQuery",
        { structuredAggregationQuery: { aggregations: [{ count: {} }] } }
    );

    return res.data[0].result.aggregateFields.field_1.integerValue;
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

export {
    getLocalLibrary,
    getCountListLocalLibrary,
    putLocalLibrary,
    getListLocalLibrary,
};
