
-- name: ListUsers :many
SELECT * FROM users;


-- name: GetUser :one
SELECT * FROM users
WHERE id = $1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1;

-- name: CreateUser :one
INSERT INTO users (name, username, password)
VALUES ($1, $2, $3)
RETURNING *;