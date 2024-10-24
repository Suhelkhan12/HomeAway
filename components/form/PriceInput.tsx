import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormPriceInputProps = {
  defaultValue?: number;
};

const PriceInput = ({ defaultValue }: FormPriceInputProps) => {
  const name = "price";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        placeholder="$$$"
        defaultValue={defaultValue || 100}
        min={0}
        required
        className="mt-2"
      />
    </div>
  );
};

export default PriceInput;
