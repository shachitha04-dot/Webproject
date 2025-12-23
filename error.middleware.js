const { errorResponse } = require('../utils/response');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Validation error
    if (err.name === 'ValidationError') {
        return errorResponse(res, err.message, 400);
    }

    // Database error
    if (err.code && err.code.startsWith('SQLITE')) {
        return errorResponse(res, 'Database error occurred', 500, err.message);
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    return errorResponse(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
const notFound = (req, res, next) => {
    return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = {
    errorHandler,
    notFound
};
