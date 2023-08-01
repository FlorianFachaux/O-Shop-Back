BEGIN;

DROP TABLE IF EXISTS "user", "order", "category", "product", "order_line";

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" VARCHAR NOT NULL,
  "lastname" VARCHAR NOT NULL,
  "email" VARCHAR NOT NULL,
  "password" VARCHAR NOT NULL,
  "address" TEXT,
  "phone" TEXT,
  "role" VARCHAR,
  "promo" VARCHAR,
  "isAdmin" BOOLEAN DEFAULT false
);

CREATE TABLE "order" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ,
	"paid_at" TIMESTAMPTZ
);

CREATE TABLE "category" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" VARCHAR NOT NULL,
  "slug" VARCHAR UNIQUE,
	"description" TEXT NOT NULL
);

CREATE TABLE "product" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "article_name" VARCHAR NOT NULL,
  "excerpt" TEXT NOT NULL,
  "price" NUMERIC NOT NULL,
  "image" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category_id" INT NOT NULL REFERENCES "category"("id"),
  "quantity" INT
);

CREATE TABLE "order_line" (
  "order_id" INT NOT NULL REFERENCES "order"("id"),
  "product_id" INT NOT NULL REFERENCES "product"("id"),
  "quantity" INT NOT NULL
);

COMMIT;