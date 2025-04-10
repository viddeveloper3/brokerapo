module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.code === 21608) {
    err.message = "Number is not registered.";
  }
  if (err.code === 20404) {
    err.message = "User is already verified. or Not valid phone number.";
  }
  if (err.code === 60203) {
    err.message = "Max send attempts reached.";
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
