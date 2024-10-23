"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./Fromcontainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";
import { type actionFunction } from "@/utils/types";
import { LuUser2 } from "react-icons/lu";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

const ImageInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, action, text, children } = props;
  const [isUpdateFromVisible, setUpdateFromVisible] = useState<boolean>(false);

  // creating fallback image
  const userIcon = (
    <LuUser2 className=" size-24 bg-primary rounded text-white mb-4" />
  );
  return (
    <div className=" flex sm:flex-row flex-col sm:items-center  sm:gap-12 gap-4 sm:mb-0 mb-6">
      <div>
        {image ? (
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className=" rounded object-cover mb-4 size-24"
          />
        ) : (
          userIcon
        )}
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setUpdateFromVisible(true)}
        >
          {text}
        </Button>
      </div>

      {isUpdateFromVisible && (
        <div className=" max-w-lg mt-4 ">
          <FormContainer action={action}>
            {children}
            <ImageInput />
            <div className=" flex items-center gap-6">
              <SubmitButton size="sm" />
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => setUpdateFromVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default ImageInputContainer;
