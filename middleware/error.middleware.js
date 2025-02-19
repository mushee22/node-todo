const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error",
            stack: error.stack
        });

    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;