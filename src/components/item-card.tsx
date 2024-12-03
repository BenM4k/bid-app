import React from "react";

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
      <p>Starting price: ${item.startingPrice}</p>
    </div>
  );
}
