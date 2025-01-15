import { Request, Response } from "express";
import { authService } from "./authService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class AuthController {
  async signup(req: Request, res: Response) {
    const serviceResponse = await authService.signup(req.body);
    // if (serviceResponse.success) generateJWT(serviceResponse.data, res);
    handleServiceResponse(serviceResponse, res);
  }

  async login(req: Request, res: Response) {
    const serviceResponse = await authService.login(req.body);
    // if (serviceResponse.success) generateJWT(serviceResponse.data, res);
    handleServiceResponse(serviceResponse, res);
  }
}

export const authController = new AuthController();
