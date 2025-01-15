import { Users } from "@prisma/client";
import { AuthRepository } from "./authRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import z from "zod";
import { StatusCodes } from "http-status-codes";
import { apiLogger, generateJWT } from "@/common/utils/httpHandlers";

const signupFormData = z.object({
  email: z.string(),
  password: z.string().min(8),
  age: z.number().min(12),
});

const loginFormData = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export class AuthService {
  private authRespository: AuthRepository;

  constructor(authRepository: AuthRepository = new AuthRepository()) {
    this.authRespository = authRepository;
  }

  async signup(formData: Users) {
    try {
      const { success: validationSuccess } = signupFormData.safeParse(formData);

      if (!validationSuccess) {
        return ServiceResponse.failure("wrong form values provided", null);
      }

      const newUser = await this.authRespository.createUser(formData);

      const accessToken = await generateJWT(newUser);

      return ServiceResponse.success<{
        user: Partial<Users>;
        accessToken: string;
      }>("User created!", { user: newUser, accessToken }, StatusCodes.CREATED);
    } catch (error) {
      apiLogger.error(error);
      return ServiceResponse.failure(
        "User creation failed",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(formData: Users) {
    try {
      const { success: validationSuccess } = loginFormData.safeParse(formData);

      if (!validationSuccess) {
        return ServiceResponse.failure("wrong form values provided", null);
      }

      const userFound = await this.authRespository.validateUser(formData);

      if (!userFound) {
        return ServiceResponse.failure("user not registered", null);
      }

      const accessToken = await generateJWT(userFound);

      return ServiceResponse.success<{
        user: Partial<Users>;
        accessToken: string;
      }>("user logged in successfully", {
        user: userFound,
        accessToken,
      });
    } catch (error) {
      apiLogger.error(error);
      return ServiceResponse.failure(
        "User login failed",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const authService = new AuthService();
