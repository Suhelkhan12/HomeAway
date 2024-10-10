import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const createProfileAction = async (formDate: FormData) => {
  "use server";
  const firstName = formDate.get("firstName") as string;
  console.log(firstName);
};

const CreateProfile = () => {
  return (
    <section>
      <h1 className=" text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <form action={createProfileAction}>
          <div className="mb-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" type="text" />
          </div>
          <Button type="submit" size={"lg"}>
            Create profile
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateProfile;
