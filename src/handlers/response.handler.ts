class APIResponse {
  public status: number;
  public message: string;
  public data?: any;

  constructor({
    status = 200,
    message = "Success",
    data,
  }: APIResponseContructorInterface) {
    this.status = status;
    this.message = message;
    if (data) this.data = data;
  }

  static send({
    status = 200,
    message = "Success",
    data,
  }: APIResponseContructorInterface) {
    return new APIResponse({ status, message, data });
  }
}

export default APIResponse;
