// Custom error handler (Express already has a built-in error-handler)
import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors/custom-error";
const errorHandlerMiddleware = (
  err: CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err }); //can also use a custom error message here
};

export default errorHandlerMiddleware;
