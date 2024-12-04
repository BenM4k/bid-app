"use client";
import Image from "next/image";
import { SignOut } from "./sign-out";
import SignIn from "./sign-in";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useRef, useState } from "react";
import { formatToDollar } from "@/lib/currency";

export default function Header() {
  const session = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const user = session?.data?.user;

  return (
    <div className="bg-gray-200 p-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="hover:underline flex items-center gap-1">
            <Image src={"/logo.png"} alt="" width={50} height={50} />
            Bidbuddy.com
          </Link>
          <Link href={"/"} className="hover:underline flex items-center gap-1">
            All Auctions
          </Link>
          {user && (
            <>
              <Link
                href={"/items/create"}
                className="hover:underline flex items-center gap-1"
              >
                Create Auction
              </Link>
              <Link
                href={"/auction"}
                className="hover:underline flex items-center gap-1"
              >
                My Auctions
              </Link>
            </>
          )}
        </div>
        <div className="flex  items-end gap-4">
          {user && (
            <>
              <div className="">
                <NotificationIconButton
                  ref={notifButtonRef}
                  onClick={() => setIsVisible(!isVisible)}
                />
                <NotificationFeedPopover
                  buttonRef={notifButtonRef}
                  isVisible={isVisible}
                  onClose={() => setIsVisible(false)}
                  renderItem={({ item, ...props }) => (
                    <NotificationCell {...props} item={item}>
                      <div className="">
                        <Link
                          href={`/items/${item.data?.itemId}`}
                          className="text-sm hover:underline"
                        >
                          Someone outbidded you on{" "}
                          <span className="font-bold mr-1">
                            {item.data?.itemName}
                          </span>
                          by
                          <span className=" ml-1 font-bold">
                            ${formatToDollar(item.data?.bidAmount)}
                          </span>
                        </Link>
                      </div>
                    </NotificationCell>
                  )}
                />
              </div>
            </>
          )}
          <h3 className="">Hello {session?.data?.user?.name ?? "new user"}</h3>
          {user ? <SignOut /> : <SignIn />}
        </div>
      </div>
    </div>
  );
}
