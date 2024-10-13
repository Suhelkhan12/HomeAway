"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type ButtonProps = {
  classname?: string;
  text?: string;
};

export function SubmitButton(props: ButtonProps) {
  const { classname = "", text = "submit" } = props;
  const { pending } = useFormStatus();
  return (
    <Button
      className={`capitalize ${classname}`}
      type="submit"
      size={"lg"}
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
