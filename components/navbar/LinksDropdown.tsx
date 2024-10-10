import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuUser2, LuAlignLeft } from "react-icons/lu";
import { Button } from "../ui/button";
// import UserIcon from "./UserIcon";
// import SignOutLink from "./SignOutLink";

import { links } from "@/utils/links";

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="flex gap-4 max-w-[6rem]">
          <LuAlignLeft className=" size-6" />
          <LuUser2 className=" size-6 bg-primary rounded-full text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52" sideOffset={10}>
        {links.map(({ href, label }) => (
          <DropdownMenuItem key={href}>
            <Link href={href} className=" capitalize w-full">
              <span>{label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
