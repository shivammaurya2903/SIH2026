const successResponse = (res, data = null, message = 'Operation successful', statusCode = 200, extra = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== null ? { data } : {}),
    ...extra
  });
};

const errorResponse = (res, message = 'Something went wrong', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {})
  });
};

module.exports = {
  successResponse,
  errorResponse
};