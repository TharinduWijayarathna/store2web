const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || err.status || 500;
  const message =
    status >= 500 ? "Internal Server Error" : err.message || "Request failed";

  res.status(status).json({ error: message });
};

module.exports = { errorHandler };
