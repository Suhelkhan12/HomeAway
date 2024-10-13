import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FromInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder: string;
};
const FormInput = (props: FromInputProps) => {
  const { name, type, label, placeholder, defaultValue } = props;

  return (
    <div className="mb-2">
      <Label htmlFor={name} className=" capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        className=" mt-2"
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default FormInput;
