package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/el-abraham/mini-project/api"
	"github.com/el-abraham/mini-project/db/repository"
	"github.com/el-abraham/mini-project/middleware"
	"github.com/el-abraham/mini-project/utils"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	ctx := context.Background()

	conn, err := pgx.Connect(ctx, utils.GetEnv("DB_URL", ""))
	if err != nil {
		os.Exit(1)
	}

	defer conn.Close(ctx)

	repo := repository.New(conn)
	// users, _ := repo.ListUsers(ctx)

	// fmt.Printf("%+v\n", users)

	router := gin.New()

	router.Use(gin.Recovery())
	router.Use(middleware.CORS())

	gin.SetMode(gin.ReleaseMode)

	if gin.Mode() == gin.DebugMode {
		router.Use(gin.Logger())
	}

	apiGroup := router.Group("/api")
	{
		apiGroup.GET("", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})

		userApi := api.NewUser(ctx, repo)
		apiGroup.POST("/user/login", userApi.Login)

		apiGroup.Use(middleware.JWTAuth())

		dishApi := api.NewDish(ctx, repo)
		apiGroup.GET("/dish/list", dishApi.ListDishes)
		apiGroup.POST("/dish/create", dishApi.CreateDish)
		apiGroup.PUT("/dish/update/:id", dishApi.UpdateDish)
		apiGroup.DELETE("/dish/delete/:id", dishApi.SoftDeleteDish)

		orderApi := api.NewOrder(ctx, repo)
		apiGroup.GET("/order/list", orderApi.ListOrders)
		apiGroup.POST("/order/create", orderApi.CreateOrder)
		apiGroup.PUT("/order/update", nil)
		apiGroup.DELETE("/order/delete", nil)
	}

	if gin.Mode() == gin.ReleaseMode {
		router.NoRoute(func(c *gin.Context) {
			staticPath := filepath.Join(".", "ui", "dist", "index.html")
			c.File(staticPath)
		})

		router.Static("/assets", "./ui/dist/assets")
		router.StaticFile("/vite.svg", "./ui/dist/vite.svg")
	}

	address := fmt.Sprintf(":%s", os.Getenv("PORT"))

	server := &http.Server{
		Addr:           address,
		Handler:        router,
		ReadTimeout:    10 * time.Minute,
		WriteTimeout:   10 * time.Minute,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println(server.ListenAndServe().Error())
}
