import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse, verifyJWT } from "@/common/utils/httpHandlers";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AuthMiddleware {
  static auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeaderValue = req.headers.authorization ?? "";
    const token = authHeaderValue.replace("Bearer ", "");

    if (!token) {
      handleServiceResponse(
        ServiceResponse.failure(
          "Token not provided",
          null,
          StatusCodes.UNAUTHORIZED,
        ),
        res,
      );
      return;
    }

    const decoded = verifyJWT(token);

    if (!decoded) {
      handleServiceResponse(
        ServiceResponse.failure(
          "Token is not valid",
          null,
          StatusCodes.UNAUTHORIZED,
        ),
        res,
      );
      return;
    }

    res.locals.user = decoded;
    next();
  };
}
