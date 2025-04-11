class AppError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.code = message.code ? message.code : 0;
  }
}

module.exports = AppError;
