import { createBid } from "@/actions/bids-actions";
import { Button } from "@/components/ui/button";
import { getBidsForItem } from "@/data-access/bids";
import { getItemById } from "@/data-access/items";
import { formatToDollar } from "@/lib/currency";
import { formatDistance } from "date-fns";
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
  const allBids = await getBidsForItem(Number(itemId));
  const hasBids = allBids.length > 0;
  const item = await getItemById(Number(itemId));

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
                Current Bid:{" "}
                <span className="text-2xl font-bold">
                  ${formatToDollar(item.currentBid)}
                </span>
              </p>
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
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-center">Current bids</h2>
            <form action={createBid.bind(null, item.id)}>
              <Button type="submit">Place Bid</Button>
            </form>
          </div>

          <ul className="space-y-4">
            {hasBids ? (
              allBids.map((bid) => (
                <li className="bg-gray-200 rounded-xl p-8" key={bid.id}>
                  <div className="flex gap-4">
                    <div className="">
                      <span className="font-bold mr-1">
                        ${formatToDollar(bid.amount)}
                      </span>
                      by <span className="font-bold ml-1">{bid.user.name}</span>
                    </div>
                    <div className="">{formatTimestamp(bid.timestamp)}</div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center space-y-2 bg-gray-100 rounded-2xl p-8">
                <h2>No bids yet</h2>
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
