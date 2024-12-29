import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default async function SmallScreenMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/"}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/my-collection"}>My Collection</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
