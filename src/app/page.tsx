import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">
        Hello {session?.user?.name ?? "New User"}
      </h1>
      <div className="mt-8">{session?.user ? <SignOut /> : <SignIn />}</div>
    </div>
  );
}
