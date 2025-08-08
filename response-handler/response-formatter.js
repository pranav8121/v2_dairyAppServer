function sendResponse(res, { status, status_code = 200, message = '', code, data = {}, error = [] }) {

    res.status(status_code).json({
        status,
        status_code,
        message,
        code,
        data,
        error
    });
}

module.exports = sendResponse;