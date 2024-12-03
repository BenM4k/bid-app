import { auth } from "@/auth";
import Image from "next/image";
import { SignOut } from "./sign-out";
import SignIn from "./sign-in";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <div className="bg-gray-200 p-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="hover:underline flex items-center gap-1">
            <Image src={"/logo.png"} alt="" width={50} height={50} />
            Bidbuddy.com
          </Link>
          <Link
            href={"/bids/create"}
            className="hover:underline flex items-center gap-1"
          >
            Auction Item
          </Link>
        </div>
        <div className="flex flex-col items-end">
          <h3 className="">Hello {session?.user?.name ?? "new user"}</h3>
          {session?.user ? <SignOut /> : <SignIn />}
        </div>
      </div>
    </div>
  );
}
