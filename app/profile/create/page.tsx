import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/Fromcontainer";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProfileAction = async (prevState: any, formData: FormData) => {
  "use server";
  console.log(formData.get("firstName"));
  return { message: "Profile created successfully." };
};

const CreateProfile = () => {
  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-8 capitalize">new user</h1>
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
