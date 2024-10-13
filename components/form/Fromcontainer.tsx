"use client";

import { ReactNode } from "react";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { type actionFunction } from "@/utils/types";
import { toast } from "sonner";

const initialState = {
  message: "",
};

type ContainerProps = {
  action: actionFunction;
  children: ReactNode;
};

function FormContainer({ action, children }: ContainerProps) {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
