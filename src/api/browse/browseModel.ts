import { idValidatior } from "@/common/utils/validators";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const MediaSchema = z.object({
	id: z.string(),
	cast: z.string(),
	country: z.string(),
	date_added: z.string(),
	description: z.string(),
	director: z.string(),
	duration: z.string(),
	listed_in: z.string(),
	rating: z.string(),
	release_year: z.number().int(),
	show_id: z.string(),
	title: z.string(),
	type: z.string(),
});

export const GetAllPagedResponse = z.object({
	records: z.array(MediaSchema),
	totalRecords: z.number(),
	page: z.number(),
	pageSize: z.number(),
});

const searchTypeSchema = z
	.union([
		z.literal("Movie"),
		z.literal("TV Show"),
		z.literal("Cast"),
		z.literal(""),
	])
	.optional();

export const GetAllPagedQuery = z.object({
	page: idValidatior,
	pageSize: idValidatior,
	searchTerm: z.string().optional(),
	searchType: searchTypeSchema,
});

export const AuthHeaders = z.object({
	Authorization: z.string(),
});

export const GetByIdParam = z.object({ id: z.string() });
