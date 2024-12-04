import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <Button type="submit" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
