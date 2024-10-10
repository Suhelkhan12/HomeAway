import Link from "next/link";
import { Button } from "../ui/button";
import { MdMapsHomeWork } from "react-icons/md";

const Logo = () => {
  return (
    <Button asChild size={"icon"} variant={"link"}>
      <Link href={"/"}>
        <MdMapsHomeWork className=" size-6 text-primary" />
      </Link>
    </Button>
  );
};

export default Logo;
