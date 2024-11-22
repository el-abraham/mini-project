package api

import (
	"context"
	"net/http"

	"github.com/el-abraham/mini-project/db/repository"
	"github.com/gin-gonic/gin"
)

type Order struct {
	ctx  context.Context
	repo *repository.Queries
}

func (o *Order) CreateOrder(c *gin.Context) {
	var orderDto CreateOrderDto
	if err := c.ShouldBindJSON(&orderDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	order, err := o.repo.CreateOrder(o.ctx, GetTotalPrice(orderDto.Dishes))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dishRepoParams := OrderDishDtoToRepository(orderDto.Dishes, order.ID)
	_, err = o.repo.CreateOrderDish(o.ctx, dishRepoParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	data := map[string]interface{}{
		"id":    order.ID,
		"total": order.TotalPrice,
		"dish":  dishRepoParams,
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order created successfully", "data": data})
}

func (o *Order) ListOrders(c *gin.Context) {
	orders, err := o.repo.ListOrders(o.ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if orders == nil {
		orders = []repository.Order{}
	}

	c.JSON(http.StatusOK, gin.H{"data": orders, "message": "success"})
}

func NewOrder(ctx context.Context, repo *repository.Queries) *Order {
	return &Order{ctx, repo}
}

type CreateOrderDishDto struct {
	DishId   int64 `json:"dish_id" binding:"required"`
	Quantity int32 `json:"quantity" binding:"required"`
	Price    int64 `json:"price" binding:"required"`
}

func GetTotalPrice(o []CreateOrderDishDto) int64 {
	var total int64
	for _, v := range o {
		total += v.Price * int64(v.Quantity)
	}

	return total
}

func OrderDishDtoToRepository(o []CreateOrderDishDto, orderId int64) []repository.CreateOrderDishParams {
	var params []repository.CreateOrderDishParams
	for _, v := range o {
		repo := repository.CreateOrderDishParams{
			DishID:   v.DishId,
			OrderID:  orderId,
			Quantity: v.Quantity,
			Price:    v.Price,
		}

		params = append(params, repo)
	}
	return params

}

type CreateOrderDto struct {
	Dishes []CreateOrderDishDto `json:"dishes" binding:"required"`
}
