const { DomainError, NotFoundError } = require("../../domain/error");

function errorMiddleware(err, req, res, next) {
  if (err instanceof DomainError) {
    return res.status(409).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }


  console.error("Unexpected error:", err);
  return res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorMiddleware;