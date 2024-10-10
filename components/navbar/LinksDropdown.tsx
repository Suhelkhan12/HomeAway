import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SignInButton, SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { LuUser2, LuAlignLeft } from "react-icons/lu";
import { Button } from "../ui/button";
import SignOutLink from "./SignOutLink";

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
      <DropdownMenuContent align="start" className="w-40" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Log in</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className=" w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          <>
            {links.map(({ href, label }) => (
              <DropdownMenuItem key={href}>
                <Link href={href} className=" capitalize w-full">
                  <span>{label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className=" bg-slate-200" />
            <DropdownMenuItem>
              <SignOutLink />
            </DropdownMenuItem>
          </>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
