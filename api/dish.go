package api

import (
	"context"
	"net/http"
	"strconv"

	"github.com/el-abraham/mini-project/db/repository"
	"github.com/gin-gonic/gin"
)

type Dish struct {
	ctx  context.Context
	repo *repository.Queries
}

func NewDish(ctx context.Context, repo *repository.Queries) *Dish {
	return &Dish{ctx, repo}
}

func (d *Dish) CreateDish(c *gin.Context) {
	dishDto := CreateDishDto{}
	if err := c.ShouldBindJSON(&dishDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dishRepo := d.toRepository(dishDto)

	dish, err := d.repo.CreateDish(d.ctx, dishRepo)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Dish created successfully", "data": dish})
}

func (d *Dish) ListDishes(c *gin.Context) {

	dish, err := d.repo.ListDishes(d.ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if dish == nil {
		dish = []repository.Dish{}
	}

	c.JSON(http.StatusOK, gin.H{"data": dish, "message": "success"})
}

func (d *Dish) GetDish(c *gin.Context) {

}

func (d *Dish) UpdateDish(c *gin.Context) {
	dishId, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid dish ID"})
		return
	}

	var dishDto CreateDishDto
	if err := c.ShouldBindJSON(&dishDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dish, err := d.repo.UpdateDish(d.ctx, repository.UpdateDishParams{
		ID:      dishId,
		Name:    dishDto.Name,
		Picture: dishDto.Picture,
		Price:   dishDto.Price,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Dish updated successfully", "data": dish})
}

func (d *Dish) SoftDeleteDish(c *gin.Context) {
	dishId, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid dish ID"})
		return
	}

	err = d.repo.SoftDeleteDish(d.ctx, dishId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Dish deleted successfully"})
}

type CreateDishDto struct {
	Name    string `json:"name" binding:"required"`
	Price   int64  `json:"price" binding:"required"`
	Picture string `json:"picture" binding:"required"`
}

func (dish *Dish) toRepository(dishDto CreateDishDto) repository.CreateDishParams {
	return repository.CreateDishParams{
		Name:    dishDto.Name,
		Price:   dishDto.Price,
		Picture: dishDto.Picture,
	}
}
