import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler = (handlerFunction: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handlerFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
