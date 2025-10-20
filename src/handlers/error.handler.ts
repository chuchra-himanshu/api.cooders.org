class APIError extends Error {
  public status: number;
  public message: string;
  public error?: any;

  constructor({
    status = 500,
    message = "Internal Server Error",
    error,
  }: APIErrorContructorInterface) {
    super(message);
    this.status = status;
    this.message = message;
    if (error) this.error = error;
    this.stack = String(Error.captureStackTrace(this, this.constructor));
  }

  static send({
    status = 500,
    message = "Internal Server Error",
    error,
  }: APIErrorContructorInterface) {
    return new APIError({ status, message, error });
  }
}

export default APIError;
