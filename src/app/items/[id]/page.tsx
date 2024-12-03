import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { formatToDollar } from "@/lib/currency";
import { formatDistance } from "date-fns";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

type Bid = {
  id: string;
  timestamp: Date;
  amount: string;
  userName: string;
}[];
export default async function Page({ params }: Props) {
  const itemId = (await params).id;
  const bids: Bid = [];
  const hasBids = bids.length > 0;
  const item = await database.query.items.findFirst({
    where: eq(items.id, Number(itemId)),
  });

  if (!item) return notFound();

  return (
    <main className="container p-12">
      <div className="flex justify-between gap-8">
        <div className="">
          <h1 className="text-2xl mb-4">
            Auction for <span className="text-4xl font-bold">{item.name}</span>
          </h1>
          <div className="">
            <div className="space-y-2">
              <p>
                Starting price:{" "}
                <span className="text-2xl font-bold">
                  ${formatToDollar(item.startingPrice)}
                </span>
              </p>
              <p>
                Bid interval:{" "}
                <span className="text-2xl font-bold">
                  ${formatToDollar(item.bidInterval)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <h2 className="text-2xl font-bold text-center">Current bids</h2>

          <ul className="space-y-4">
            {hasBids ? (
              bids.map((bid) => (
                <li className="bg-gray-200 rounded-xl p-8">
                  <div className="flex gap-4">
                    <div className="">
                      <span className="font-bold">${bid.amount}</span> by
                      <span className="font-bold">{bid.userName}</span>
                    </div>
                    <div className="">{formatTimestamp(bid.timestamp)}</div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center space-y-2 bg-gray-100 rounded-2xl p-8">
                <h2>No bids yet</h2>
                <Button>Place Bid</Button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}
