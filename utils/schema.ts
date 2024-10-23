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

// for validating image size and accepted types
function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1 MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image.");
}

export const imageSchema = z.object({
  image: validateFile(),
});
