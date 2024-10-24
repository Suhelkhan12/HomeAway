import { createClient } from "@supabase/supabase-js";

const supbaseBucketName = "stayz-images";

// initialise supabase client
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;
const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  // createing name for uploaded image
  const timeStamp = Date.now();
  const name = `${timeStamp}-${image.name}`;

  // sending image to supabse bucket
  const { data, error } = await supabase.storage
    .from(supbaseBucketName)
    .upload(name, image, {
      cacheControl: "3600",
    });

  // throwing error if no upload
  if (!data) {
    console.log(error);
    throw new Error("Image upload failed 💥");
  }

  // fetching the public url from the bucket to use it
  return supabase.storage.from(supbaseBucketName).getPublicUrl(name).data
    .publicUrl;
};
