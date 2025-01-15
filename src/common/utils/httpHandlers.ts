import { Response } from "express";
import { ServiceResponse } from "../models/serviceResponse";
import jwt from "jsonwebtoken";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response,
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export async function generateJWT(payload: any) {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiry = Number(process.env.JWT_EXPIRY);
  if (!jwtSecret) throw new Error("JWT_SECRET not present");
  if (!jwtExpiry) throw new Error("JWT_EXPIRY not present");
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiry,
  });
}

export const verifyJWT = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET not present");
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return;
  }
};
