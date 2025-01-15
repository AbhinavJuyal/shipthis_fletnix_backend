import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const UsersSchema = z.object({
	fullname: z.string(),
	email: z.string(),
	age: z.number().int(),
});

export const AuthSchema = z.object({
	user: UsersSchema,
	accessToken: z.string(),
});
