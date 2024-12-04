import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Sign Out
    </Button>
  );
}
