
-- name: ListDishes :many
SELECT * FROM dishes
WHERE deleted_at IS NULL;

-- name: GetDish :one
SELECT * FROM dishes
WHERE id = $1;

-- name: CreateDish :one
INSERT INTO dishes (name, picture, price)
VALUES ($1, $2, $3)
RETURNING *;

-- name: UpdateDish :one
UPDATE dishes
SET name = $2, picture = $3, price = $4, updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE id = $1
RETURNING *;

-- name: SoftDeleteDish :exec
UPDATE dishes
SET deleted_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE id = $1;
