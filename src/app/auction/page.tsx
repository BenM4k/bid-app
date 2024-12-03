import { auth } from "@/auth";
import ItemCard from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default async function AuctionPage() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const myItems = await database.query.items.findMany({
    where: eq(items.userId, session?.user?.id!),
  });

  return (
    <main className="container p-12 flex flex-col items-center">
      <h1 className="text-4xl font bold py-6">My items</h1>

      {myItems.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {myItems.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="space-y-8 flex flex-col items-center">
          <Image src="/package.svg" alt="" width={200} height={200} />
          <h2 className="text-xl font-bold">You have no auctions yet</h2>
          <Button asChild>
            <Link href="/items/create">Create Auction</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
