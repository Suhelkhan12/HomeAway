import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageInput = () => {
  // for our image upload component we are deciding that all the component instaces are going to have this same name
  const name = "image";
  return (
    <div className="flex flex-col gap-3 mb-3">
      <Label htmlFor={name} className=" capitalize">
        Select new image
      </Label>
      <Input
        id={name}
        name={name}
        type={"file"}
        required
        accept="image/*"
        className=" max-w-xs cursor-pointer"
      />
    </div>
  );
};

export default ImageInput;
