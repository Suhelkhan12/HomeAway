import React from "react";
import { fetchProfile, updateProfileAction } from "@/actions/actions";
import FormContainer from "@/components/form/Fromcontainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";

const Profile = async () => {
  const profile = await fetchProfile();
  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-8 capitalize mt-10">
        Update profile
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={updateProfileAction}>
          <div className=" grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="firstName"
              type="text"
              label="first name"
              defaultValue={profile.firstName}
            />
            <FormInput
              name="lastName"
              type="text"
              label="last name"
              defaultValue={profile.lastName}
            />
            <FormInput
              name="userName"
              type="text"
              label="user name"
              defaultValue={profile.userName}
            />
          </div>
          <SubmitButton text="Update profile" classname=" mt-6" />
        </FormContainer>
      </div>
    </section>
  );
};

export default Profile;
