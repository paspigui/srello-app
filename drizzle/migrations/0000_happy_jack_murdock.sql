CREATE TABLE IF NOT EXISTS "activities" (
	"id_activity" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"id_card" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id_card" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text,
	"creation_date" timestamp DEFAULT now(),
	"deadline" timestamp,
	"id_list" integer NOT NULL,
	"id_assigned" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id_comment" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"id_card" integer NOT NULL,
	"id_autor" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "labels" (
	"id_label" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"color" varchar(20) NOT NULL,
	"id_card" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lists" (
	"id_list" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"list_order" integer NOT NULL,
	"id_table" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tables" (
	"id_table" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"creation_date" timestamp DEFAULT now(),
	"id_creator" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id_user" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"mail" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_mail_unique" UNIQUE("mail")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_id_card_cards_id_card_fk" FOREIGN KEY ("id_card") REFERENCES "public"."cards"("id_card") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_id_list_lists_id_list_fk" FOREIGN KEY ("id_list") REFERENCES "public"."lists"("id_list") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_id_assigned_users_id_user_fk" FOREIGN KEY ("id_assigned") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_id_card_cards_id_card_fk" FOREIGN KEY ("id_card") REFERENCES "public"."cards"("id_card") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_id_autor_users_id_user_fk" FOREIGN KEY ("id_autor") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "labels" ADD CONSTRAINT "labels_id_card_cards_id_card_fk" FOREIGN KEY ("id_card") REFERENCES "public"."cards"("id_card") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lists" ADD CONSTRAINT "lists_id_table_tables_id_table_fk" FOREIGN KEY ("id_table") REFERENCES "public"."tables"("id_table") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tables" ADD CONSTRAINT "tables_id_creator_users_id_user_fk" FOREIGN KEY ("id_creator") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
