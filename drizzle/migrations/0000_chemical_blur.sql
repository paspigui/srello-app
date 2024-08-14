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
	"title" varchar(100) NOT NULL,
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
	"name" varchar(50) NOT NULL,
	"color" varchar(20) NOT NULL,
	"cardId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"listId" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"listOrder" integer NOT NULL,
	"tableId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table" (
	"tableId" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"creationDate" timestamp DEFAULT now(),
	"creatorId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"userId" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"mail" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_mail_unique" UNIQUE("mail")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "card" ADD CONSTRAINT "card_assignedId_user_userId_fk" FOREIGN KEY ("assignedId") REFERENCES "public"."user"("userId") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "comment" ADD CONSTRAINT "comment_autorId_user_userId_fk" FOREIGN KEY ("autorId") REFERENCES "public"."user"("userId") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "table" ADD CONSTRAINT "table_creatorId_user_userId_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."user"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
