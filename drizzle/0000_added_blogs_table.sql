CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"url" text NOT NULL,
	"author" text NOT NULL,
	"likes" integer NOT NULL
);
