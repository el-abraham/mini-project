
-- name: ListOrders :many
SELECT * FROM orders;

-- name: GetOrder :one
SELECT * FROM orders
WHERE id = $1;

-- name: CreateOrder :one
INSERT INTO orders (total_price)
VALUES ($1)
RETURNING *;

-- name: UpdateOrder :one
UPDATE orders
SET total_price = $2, updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE id = $1
RETURNING *;

-- name: SoftDeleteOrder :exec
UPDATE orders
SET deleted_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE id = $1;

