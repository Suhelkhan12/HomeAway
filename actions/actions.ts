"use server";

import { profileSchema } from "@/utils/schema";
import prisma from "@/lib/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import console, { error } from "console";

// helper functions
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this feature.");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

// for rendering error
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message:
      error instanceof Error
        ? error.message
        : "Could not process your request at the moment💥💥💥",
  };
};

// for creating profile
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
    return renderError(err);
  }

  // redirecting user to home page
  redirect("/");
};

// for fetching image related to user
export const fetchProfileImage = async () => {
  const user = await getAuthUser();

  // fetching user from your db using clerk id and selecting image of the user only using select
  const profile = await prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

// for fetching user profile
export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      firstName: true,
      lastName: true,
      profileImage: true,
      userName: true,
    },
  });

  if (!profile) redirect("/profile/create");

  return profile;
};

// for updating user profile

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rowData = Object.fromEntries(formData);
    const validatedFields = profileSchema.safeParse(rowData);

    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map((err) => err.message);
      throw new Error(errors.join(","));
    }
    await prisma.profile.update({
      where: {
        clerkId: user?.id,
      },
      data: validatedFields.data,
    });

    // revalidating path
    revalidatePath("/profile");
    return { message: "Profile updated successfully🎊" };
  } catch (err) {
    return renderError(err);
  }
};
