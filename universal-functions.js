function sendSuccess(res, data, message, statusCode) {
    const response = {
        data: data || {},
        statusCode: statusCode || 200,
        message: message || "SUCCESS"
    };
    res.status(response.statusCode).send(response);
}

function sendError(res, error) {
    let errorObj = {
        error: (error && (error.error && (error.error.message || error.error))) || "Bad Request",
        statusCode: (error && error.statusCode) || 400,
        message: (error && ((error.error && error.error.message) || error.message)) || "Bad Request"
    };
    if (error.isBoom) {
        errorObj = error.output.payload;
    }
    res.status(errorObj.statusCode).send(errorObj);
}

module.exports = {
    sendSuccess,
    sendError
};