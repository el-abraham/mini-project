
-- name: GetOrderDetail :many
SELECT order_dish.*, sqlc.embed(dishes) FROM order_dish
JOIN dishes ON order_dish.dish_id = dishes.id
WHERE order_id = $1;

-- name: CreateOrderDish :copyfrom 
INSERT INTO order_dish (order_id, dish_id, quantity, price)
VALUES ($1, $2, $3, $4);

-- name: UpdateOrderDish :exec
UPDATE order_dish
SET quantity = $2, price = $3
WHERE id = $1
RETURNING *;

-- name: DeleteOrderDish :exec
DELETE FROM order_dish
WHERE id = $1;

-- name: GetOrderDish :one
SELECT * FROM order_dish
WHERE id = $1;