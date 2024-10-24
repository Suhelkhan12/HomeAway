import React from "react";

import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/Fromcontainer";
import { createProfileAction } from "@/actions/actions";
import { currentUser } from "@clerk/nextjs/server";

const CreateProfile = async () => {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");

  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-8 capitalize">
        Create you profile
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProfileAction}>
          <div className=" grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="firstName"
              type="text"
              label="first name"
              placeholder="John"
            />
            <FormInput
              name="lastName"
              type="text"
              label="last name"
              placeholder="Doe"
            />
            <FormInput
              name="userName"
              type="text"
              label="user name"
              placeholder="johndoe"
            />
          </div>
          <SubmitButton text="Create profile" classname=" mt-6" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProfile;
