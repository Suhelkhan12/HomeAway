"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type btnSize = "default" | "lg" | "sm";

type ButtonProps = {
  classname?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton(props: ButtonProps) {
  const { classname = "", text = "submit", size = "lg" } = props;
  const { pending } = useFormStatus();
  return (
    <Button
      className={`capitalize ${classname}`}
      type="submit"
      size={size}
      disabled={pending}
    >
      {pending ? (
        <>
          {" "}
          <ReloadIcon className="size-4 animate-spin mr-2" /> Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}
