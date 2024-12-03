CREATE TABLE "cart_products" (
	"cartproduct_id"	INTEGER NOT NULL,
	"product_id"	INTEGER NOT NULL UNIQUE,
	"cart_id"	INTEGER NOT NULL,
	"cartproduct_count"	INTEGER NOT NULL,
	PRIMARY KEY("cartproduct_id"),
	FOREIGN KEY("cart_id") REFERENCES "carts"("cart_id"),
	FOREIGN KEY("product_id") REFERENCES "products"("product_id")
);

CREATE TABLE "carts" (
	"cart_id"	INTEGER NOT NULL,
	"cart_status"	TEXT NOT NULL,
	"cart_date"	NUMERIC NOT NULL,
	"user_id"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("cart_id"),
	FOREIGN KEY("user_id") REFERENCES "user"("user_id")
);

CREATE TABLE "categories" (
	"category_id"	INTEGER NOT NULL,
	"category_name"	TEXT NOT NULL,
	"category_rating"	REAL NOT NULL,
	"category_date"	NUMERIC NOT NULL,
	"category_purchase"	INTEGER NOT NULL,
	PRIMARY KEY("category_id")
);

CREATE TABLE "products" (
	"product_id"	INTEGER NOT NULL,
	"product_name"	TEXT NOT NULL,
	"description"	TEXT,
	"image_url"	TEXT,
	"price"	REAL NOT NULL,
	"product_date"	NUMERIC NOT NULL,
	"product_rating"	REAL NOT NULL,
	"category_id"	INTEGER NOT NULL,
	PRIMARY KEY("product_id"),
	FOREIGN KEY("category_id") REFERENCES "categories"("category_id")
);

CREATE TABLE "user" (
	"user_id"	INTEGER NOT NULL,
	"date"	NUMERIC NOT NULL,
	"time"	NUMERIC NOT NULL,
	"username"	TEXT NOT NULL UNIQUE,
	"email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"user_type"	TEXT NOT NULL,
	PRIMARY KEY("user_id")
);