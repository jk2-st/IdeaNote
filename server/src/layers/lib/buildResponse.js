
module.exports = (items = null) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
        // "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE"　複数メソッドになると401になったのでコメントアウト
    };
    return response;
}