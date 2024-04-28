export default class CustomError extends Error {
  constructor(responseCode, message) {
    super(message);
    this.responseCode = responseCode;
  }
}
