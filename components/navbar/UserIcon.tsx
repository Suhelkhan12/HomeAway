import React from "react";
import { fetchProfileImage } from "@/actions/actions";
import { LuUser2 } from "react-icons/lu";

const UserIcon = async () => {
  const profileImage = await fetchProfileImage();
  console.log(profileImage);
  if (profileImage)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={profileImage}
        className=" size-6 rounded-full object-cover"
        alt="Image related to user"
      />
    );
  return <LuUser2 className=" size-6 bg-primary rounded-full text-white" />;
};

export default UserIcon;
