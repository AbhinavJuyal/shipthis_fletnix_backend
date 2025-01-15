import z from "zod";

const idValidatior = z
  .string()
  .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
  .transform(Number)
  .refine((num) => num > 0, "ID must be a non-zero positive number.");

const paginationValidator = z.object({
  page: idValidatior,
  pageSize: idValidatior,
});

export { idValidatior, paginationValidator };
