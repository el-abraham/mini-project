CREATE TABLE order_dish (
  id       BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL,
  dish_id  BIGINT NOT NULL,
  quantity   INTEGER    NOT NULL,
  price    BIGINT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (dish_id)  REFERENCES dishes (id)
);