class APIError extends Error {
  constructor(key = 'INTERNAL_ERROR', customErrors = []) {

    super();
    this.key = key;

    if (Array.isArray(customErrors)) {
      this.error = customErrors;
    } else if (typeof customErrors === 'object' && customErrors !== null) {
      this.error = [customErrors];
    } else {
      this.error = [];
    }
  }
}

module.exports = APIError;

