import * as z from "zod";
import { ZodSchema } from "zod";

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    throw new Error(errors.join(", "));
  }

  return result.data;
}

export const profileSchema = z.object({
  firstName: z.string().min(3, {
    message: "First name must be atleast 3 characters long",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be atleast 3 characters long",
  }),
  userName: z.string().min(5, {
    message: "User name must be atleast 5 characters long",
  }),
});
