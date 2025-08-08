const APIError = require('./api-error');
const messageResponses = require('./message');
const sendResponse = require('./response-formatter');

module.exports = (controllerFn) => {
    return (req, res, next) => {
        (async () => {
            const responses = messageResponses;
            const { key, data } = await controllerFn(req);
            handleSuccessResponse(res, responses, key, data);
        })().catch((err) => {
            const responses = messageResponses;
            handleErrorResponse(res, responses, err);
        });
    };
};

function handleSuccessResponse(res, responses, key, data) {
    const { message, status_code } = responses[key] || responses.INTERNAL_ERROR;
    const response = {
        status: true,
        status_code: status_code || 200,
        message,
        code: key,
        error: [],
        data,
    };
    sendResponse(res, response);
}

function handleErrorResponse(res, responses, err) {
    const isAPIError = err instanceof APIError;
    console.log(`Error: ${err.message}`, err.stack);
    const errorKey = isAPIError ? err.key : 'INTERNAL_ERROR';
    const { message, status_code } = responses[errorKey] || responses.INTERNAL_ERROR;

    const response = {
        status: false,
        status_code: status_code || 500,
        message,
        code: errorKey,
        error: isAPIError ? err.error || [] : [],
        data: isAPIError ? undefined : {}
    };
    sendResponse(res, response);
}