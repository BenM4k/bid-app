import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollar } from "@/lib/currency";
import { format } from "date-fns";
import { isBidOver } from "@/lib/bids";

type Props = {
  item: {
    id: number;
    name: string;
    userId: string;
    startingPrice: number;
    endDate: Date;
  };
};
export default function ItemCard({ item }: Props) {
  return (
    <div className="border p-8 rounded-xl hover:border-gray-200">
      <h2 className="font-bold text-xl">{item.name}</h2>
      <p className="">
        Starting price:{" "}
        <span className="text-2xl font-bold text-green-700">
          ${formatToDollar(item.startingPrice)}
        </span>
      </p>
      {isBidOver(item) ? (
        <>
          <p className="">Bidding is over</p>
        </>
      ) : (
        <>
          <p className="">Ends on {format(item.endDate, "eeee dd/MM/yyyy")}</p>
        </>
      )}
      <Button
        className="mt-4"
        asChild
        variant={isBidOver(item) ? "outline" : "default"}
      >
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}
