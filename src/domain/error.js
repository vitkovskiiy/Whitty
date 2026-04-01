class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends DomainError {}
class ValidationError extends DomainError {}

module.exports = {
  DomainError,
  NotFoundError,
  ValidationError,
};
