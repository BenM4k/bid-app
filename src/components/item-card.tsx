import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollar } from "@/lib/currency";

type Props = {
  item: {
    id: number;
    name: string;
    userId: string;
    startingPrice: number;
  };
};
export default function ItemCard({ item }: Props) {
  return (
    <div className="border p-8 rounded-xl">
      {item.name}
      <p>Starting price: ${formatToDollar(item.startingPrice)}</p>
      <Button className="mt-4" asChild>
        <Link href={`/items/${item.id}`}>Place Bid</Link>
      </Button>
    </div>
  );
}
