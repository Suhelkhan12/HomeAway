"use server";

import { profileSchema } from "@/utils/schema";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rowData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rowData);
    console.log(validatedFields);
    return { message: "Profile validated" };
  } catch (err) {
    console.error(err);
    return { message: "There was an error." };
  }
};
