DROP TABLE IF EXISTS grocery_recipe CASCADE;
DROP TABLE IF EXISTS grocery_list CASCADE;

CREATE TABLE grocery_list (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(60) NOT NULL
);

CREATE TABLE grocery_recipe (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  grocery_list_id UUID NOT NULL,
  FOREIGN KEY (grocery_list_id) REFERENCES grocery_list(id) ON DELETE CASCADE
)