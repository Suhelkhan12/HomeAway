"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const page = () => {
  return (
    <div className=" text-3xl font-bold flex items-center justify-center h-screen">
      <Button onClick={() => toast("Hello I'm a toast.")}>Show toast</Button>
    </div>
  );
};

export default page;
