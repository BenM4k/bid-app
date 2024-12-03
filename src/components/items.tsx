import { database } from "@/db/database";
import ItemCard from "./item-card";

export default async function Items() {
  const allItems = await database.query.items.findMany();

  return (
    <div className="grid grid-cols-4 gap-4">
      {allItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
