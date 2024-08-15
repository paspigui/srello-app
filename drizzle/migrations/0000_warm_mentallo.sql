CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity" (
	"activityId" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"cardId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card" (
	"cardId" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"creationDate" timestamp DEFAULT now(),
	"deadline" timestamp,
	"listId" integer NOT NULL,
	"assignedId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"commentId" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"cardId" integer NOT NULL,
	"autorId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "label" (
	"labelId" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"cardId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"listId" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"listOrder" integer NOT NULL,
	"tableId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table" (
	"tableId" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"creationDate" timestamp DEFAULT now(),
	"creatorId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity" ADD CONSTRAINT "activity_cardId_card_cardId_fk" FOREIGN KEY ("cardId") REFERENCES "public"."card"("cardId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_listId_list_listId_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("listId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_assignedId_user_id_fk" FOREIGN KEY ("assignedId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_cardId_card_cardId_fk" FOREIGN KEY ("cardId") REFERENCES "public"."card"("cardId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_autorId_user_id_fk" FOREIGN KEY ("autorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "label" ADD CONSTRAINT "label_cardId_card_cardId_fk" FOREIGN KEY ("cardId") REFERENCES "public"."card"("cardId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list" ADD CONSTRAINT "list_tableId_table_tableId_fk" FOREIGN KEY ("tableId") REFERENCES "public"."table"("tableId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "table" ADD CONSTRAINT "table_creatorId_user_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
