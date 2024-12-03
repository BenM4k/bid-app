import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("bids_app", {
  id: serial("id").primaryKey(),
});
