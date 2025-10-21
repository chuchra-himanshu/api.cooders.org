interface APIErrorContructorInterface {
  status: number;
  message: string;
  error?: any;
}

interface APIResponseContructorInterface {
  status: number;
  message: string;
  data?: any;
}
