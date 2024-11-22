package api

import (
	"context"
	"net/http"

	"github.com/el-abraham/mini-project/db/repository"
	"github.com/el-abraham/mini-project/utils"
	"github.com/gin-gonic/gin"
)

type User struct {
	ctx  context.Context
	repo *repository.Queries
}

func NewUser(ctx context.Context, repo *repository.Queries) *User {
	return &User{ctx, repo}
}

func (u *User) Login(c *gin.Context) {
	var userLoginDto UserLoginDto
	if err := c.ShouldBindJSON(&userLoginDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := u.repo.GetUserByUsername(u.ctx, userLoginDto.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid username or password"})
		return
	}

	passowrdMatch := utils.CheckPasswordHash(userLoginDto.Password, user.Password)

	if !passowrdMatch {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	jwt := utils.NewJWT()
	token, err := jwt.CreateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "data": gin.H{"token": token}})
}

type UserLoginDto struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
