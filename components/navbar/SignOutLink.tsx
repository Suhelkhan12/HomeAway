"use client";
import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

const SignOutLink = () => {
  const handleLogOut = () => {
    toast.warning("You have been logged out 💥.");
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogOut}>
        Log out
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
