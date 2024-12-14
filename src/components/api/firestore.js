import axios from "axios";
import QueryString from "qs";

axios.defaults.paramsSerializer = (params) => {
    return QueryString.stringify(params, {
        arrayFormat: "repeat",
        allowDots: true,
    });
};

async function getLocalLibrary(isbn) {
    let res = await axios.get(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library/" + isbn
    );

    return otd(res.data.fields);
}
async function createLocalLibrary(bookData) {
    let res = axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library/",
        { fields: dto(bookData) },
        { params: { documentId: bookData.isbn } }
    );

    return res;
}

async function updateLocalLibrary(isbn, bookData) {
    let res = axios.patch(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library/" + isbn,
        {
            fields: dto(bookData),
        },
        { params: { updateMask: { fieldPaths: Object.keys(bookData) } } }
    );

    return res;
}

async function delLocalLibrary(isbn) {
    let res = axios.delete(
        process.env.REACT_APP_FIRESTORE_URL + "/documents/library/" + isbn
    );

    return res;
}

async function getListLocalLibrary(page, search_query = null, pageSize = 12) {
    const query = {
        structuredQuery: {
            offset: (page - 1) * 12,
            limit: pageSize,
            where: {
                compositeFilter: {
                    op: "AND",
                    filters: qtf(search_query),
                },
            },
            from: [{ collectionId: "library" }],
        },
    };

    const res = await axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents:runQuery",
        query
    );

    if (res.length == 1) if (!res.data[0].hasOwnProperty("document")) return []; // 검색 결과 없음
    if (page > 1) return res.data.slice(1).map((o) => otd(o.document.fields));
    else return res.data.map((o) => otd(o.document.fields));
}

async function getCountListLocalLibrary(search_query) {
    const res = await axios.post(
        process.env.REACT_APP_FIRESTORE_URL + "/documents:runAggregationQuery",
        {
            structuredAggregationQuery: {
                aggregations: [{ count: {} }],
                structuredQuery: {
                    where: {
                        compositeFilter: {
                            op: "AND",
                            filters: qtf(search_query),
                        },
                    },
                    from: [{ collectionId: "library" }],
                },
            },
        }
    );

    return res.data[0].result.aggregateFields.field_1.integerValue;
}

function qtf(search_query) {
    const search_filter = [];
    if (search_query.hasOwnProperty("star"))
        search_filter.push({
            fieldFilter: {
                op: "GREATER_THAN_OR_EQUAL",
                value: { doubleValue: search_query.star },
                field: { fieldPath: "star" },
            },
        });
    if (
        search_query.hasOwnProperty("author") &&
        search_query.author.length > 0
    ) {
        search_filter.push({
            fieldFilter: {
                op: "EQUAL",
                value: { stringValue: search_query.author },
                field: { fieldPath: "author" },
            },
        });
    }
    return search_filter;
}

function dto(bookData) {
    let fields = {};
    Object.keys(bookData).forEach((fieldName) => {
        if (bookData[fieldName] instanceof Date)
            fields[fieldName] = {
                timestampValue: bookData[fieldName].toISOString(),
            };
        else if (typeof bookData[fieldName] == "string")
            fields[fieldName] = { stringValue: bookData[fieldName] };
        else if (typeof bookData[fieldName] == "number")
            fields[fieldName] = {
                doubleValue: bookData[fieldName].toString(),
            };
    });
    return fields;
}

function otd(objectData) {
    let bookData = {};
    Object.keys(objectData).forEach((fieldName) => {
        let type = Object.keys(objectData[fieldName])[0];
        let res = objectData[fieldName][type];
        if (type == "doubleValue") res = Number(res);
        else if (type == "timestampValue") res = new Date(res);
        bookData[fieldName] = res;
    });
    return bookData;
}

export {
    getLocalLibrary,
    getCountListLocalLibrary,
    createLocalLibrary,
    getListLocalLibrary,
    updateLocalLibrary,
    delLocalLibrary,
};
