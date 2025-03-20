class ExpressError extends Error {
  constructor(statusCode = 500, message = "Something went wrong") {
      super(message); // Call the parent Error class with the message
      this.statusCode = statusCode; // Assign the status code
  }
}

module.exports = ExpressError;
