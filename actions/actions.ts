"use server";

import { profileSchema } from "@/utils/schema";
import prisma from "@/lib/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Please login to create profile.");
    }

    const rowData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rowData);

    // creating user profile
    await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl || "",
        ...validatedFields,
      },
    });

    // for syncinc clerk and webapp
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return response for toast
  } catch (err) {
    return {
      message:
        err instanceof Error
          ? err.message
          : "Could not process your request at the moment💥💥💥",
    };
  }

  // redirecting user to home page
  redirect("/");
};
