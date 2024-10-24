"use server";

import {
  imageSchema,
  profileSchema,
  validateWithZodSchema,
} from "@/utils/schema";
import prisma from "@/lib/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase";

// helper functions
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

// for rendering error
const renderError = (error: unknown): { message: string } => {
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
    const validatedFields = validateWithZodSchema(profileSchema, rowData);

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
  if (!user) return null;

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
  if (!user) return null;

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
export const updateProfileAction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rowData = Object.fromEntries(formData);

    const validatedData = validateWithZodSchema(profileSchema, rowData);
    await prisma.profile.update({
      where: {
        clerkId: user?.id,
      },
      data: validatedData,
    });

    // revalidating path
    revalidatePath("/profile");
    return { message: "Profile updated successfully🎊" };
  } catch (err) {
    return renderError(err);
  }
};

// for updating user profile image
export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();

    const image = formData.get("image") as File;
    const { image: validatedImage } = validateWithZodSchema(imageSchema, {
      image,
    });

    const imagePath = await uploadImage(validatedImage);

    await prisma.profile.update({
      where: {
        clerkId: user?.id,
      },
      data: {
        profileImage: imagePath,
      },
    });

    revalidatePath("/profile");

    return { message: "Profile image updated successfully 🎊" };
  } catch (err) {
    return renderError(err);
  }
};
