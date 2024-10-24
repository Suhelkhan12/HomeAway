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
    .refine(
      (file) => {
        return !file || file.size <= maxUploadSize;
      },
      { message: "File size must be less than 1 MB" }
    )
    .refine(
      (file) => {
        return (
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        );
      },
      { message: "File must be an image." }
    );
}

export const imageSchema = z.object({
  image: validateFile(),
});

// property schema
export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be atleast 2 characters",
    })
    .max(100, {
      message: "Name should be less than 100 characters",
    }),
  tagline: z
    .string()
    .min(2, {
      message: "Tagline must be atleast 2 characters",
    })
    .max(100, {
      message: "Tagline must be less than 150 characters",
    }),
  price: z.coerce.number().int().min(0, {
    message: "Price must be a positive number",
  }),
  category: z.string(),
  description: z.string().refine(
    (desc) => {
      const wordCount = desc.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    { message: "Description must be under 10 to 1000 words" }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: "Guest amount must be a positive number",
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: "bedrooms amount must be a positive number.",
  }),
  beds: z.coerce.number().int().min(0, {
    message: "beds amount must be a positive number.",
  }),
  baths: z.coerce.number().int().min(0, {
    message: "bahts amount must be a positive number.",
  }),
  amenities: z.string(),
});
