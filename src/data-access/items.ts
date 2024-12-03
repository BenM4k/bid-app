import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getItemById(itemId: number) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  return item;
}
