// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: dish.sql

package repository

import (
	"context"
)

const createDish = `-- name: CreateDish :one
INSERT INTO dishes (name, picture, price)
VALUES ($1, $2, $3)
RETURNING id, name, picture, price, created_at, updated_at, deleted_at
`

type CreateDishParams struct {
	Name    string `json:"name"`
	Picture string `json:"picture"`
	Price   int64  `json:"price"`
}

func (q *Queries) CreateDish(ctx context.Context, arg CreateDishParams) (Dish, error) {
	row := q.db.QueryRow(ctx, createDish, arg.Name, arg.Picture, arg.Price)
	var i Dish
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Picture,
		&i.Price,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
	)
	return i, err
}

const getDish = `-- name: GetDish :one
SELECT id, name, picture, price, created_at, updated_at, deleted_at FROM dishes
WHERE id = $1
`

func (q *Queries) GetDish(ctx context.Context, id int64) (Dish, error) {
	row := q.db.QueryRow(ctx, getDish, id)
	var i Dish
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Picture,
		&i.Price,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
	)
	return i, err
}

const listDishes = `-- name: ListDishes :many
SELECT id, name, picture, price, created_at, updated_at, deleted_at FROM dishes
WHERE deleted_at IS NULL
`

func (q *Queries) ListDishes(ctx context.Context) ([]Dish, error) {
	rows, err := q.db.Query(ctx, listDishes)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Dish
	for rows.Next() {
		var i Dish
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Picture,
			&i.Price,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.DeletedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const softDeleteDish = `-- name: SoftDeleteDish :exec
UPDATE dishes
SET deleted_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE id = $1
`

func (q *Queries) SoftDeleteDish(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, softDeleteDish, id)
	return err
}

const updateDish = `-- name: UpdateDish :one
UPDATE dishes
SET name = $2, picture = $3, price = $4, updated_at = EXTRACT(EPOCH FROM NOW())::BIGINT
WHERE id = $1
RETURNING id, name, picture, price, created_at, updated_at, deleted_at
`

type UpdateDishParams struct {
	ID      int64  `json:"id"`
	Name    string `json:"name"`
	Picture string `json:"picture"`
	Price   int64  `json:"price"`
}

func (q *Queries) UpdateDish(ctx context.Context, arg UpdateDishParams) (Dish, error) {
	row := q.db.QueryRow(ctx, updateDish,
		arg.ID,
		arg.Name,
		arg.Picture,
		arg.Price,
	)
	var i Dish
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Picture,
		&i.Price,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.DeletedAt,
	)
	return i, err
}