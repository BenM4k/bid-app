"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBid(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    throw new Error("Unauthorized");

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item needed");

  const latestBidValue = item.bidInterval + item.currentBid;

  await database.insert(bids).values({
    amount: latestBidValue,
    itemId: itemId,
    userId: session.user.id,
    timestamp: new Date(),
  });

  await database
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  revalidatePath(`/items/${itemId}`);
}
