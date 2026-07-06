import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

export const statuses = pgTable(
	"statuses",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		key: text("key").notNull(),
		position: integer("position").notNull(),
	},
	(table) => [uniqueIndex("statuses_key_idx").on(table.key)],
);

export const priorities = pgTable(
	"priorities",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		key: text("key").notNull(),
		level: integer("level").notNull(),
	},
	(table) => [uniqueIndex("priorities_key_idx").on(table.key)],
);
