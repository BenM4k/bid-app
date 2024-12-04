import { auth } from "@/auth";
import Items from "@/components/items";

export default async function Home() {
  const session = await auth();
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Items for Sale</h1>
      <Items />
    </main>
  );
}
