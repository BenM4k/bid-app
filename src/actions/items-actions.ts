"use server";

import { auth } from "../auth";
import { items } from "../db/schema";
import { database } from "@/db/database";
import { redirect } from "next/navigation";

export async function uploadItem({
  name,
  startingPrice,
  endDate,
}: {
  name: string;
  startingPrice: number;
  endDate: Date;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unathorized");
  }
  if (!session?.user) return;

  await database.insert(items).values({
    name,
    startingPrice: startingPrice,
    userId: session.user.id,
    endDate,
  });
  redirect("/");
}
