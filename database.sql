CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(20) UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL
);

CREATE TABLE user_bucket_items (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES users(id),
    "bucket_list_item" VARCHAR(600) NOT NULL,
    "completion_status" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE categories (
    "id" SERIAL PRIMARY KEY,
    "category_name" VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE category_bucket_list_items (
    "id" SERIAL PRIMARY KEY,
    "category_id" INTEGER NOT NULL REFERENCES categories(id),
    "user_id" INTEGER NOT NULL REFERENCES users(id),
    "public_bucket_list_item" VARCHAR(400) NOT NULL
);

INSERT INTO "categories" (category_name)
VALUES 
('Adventure/Travel'), 
('Personal Growth/Learning'), 
('Cultural/Artistic Experiences'), 
('Service/Contribution')
    ;
    
DROP TABLE users;
