package main

import (
	"context"
	"log"

	"github.com/el-abraham/mini-project/db/repository"
	"github.com/el-abraham/mini-project/utils"
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
		log.Fatal(err)
	}

	defer conn.Close(ctx)

	repo := repository.New(conn)

	// Create User
	hashPassword, _ := utils.HashPassword("admin")
	_, err = repo.CreateUser(ctx, repository.CreateUserParams{
		Name:     "admin",
		Username: "admin",
		Password: hashPassword,
	})

	if err != nil {
		log.Fatal(err)
	}

	// Create Dish
	_, err = repo.CreateDish(ctx, repository.CreateDishParams{
		Name:    "Fried Rice",
		Price:   20000,
		Picture: "https://www.seriouseats.com/thmb/zO80j7KGl3j2k3vgrNVahBWUQBk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20230529-SEA-EggFriedRice-AmandaSuarez-hero-c8d95fbf69314b318bc279159f582882.jpg",
	})
	if err != nil {
		log.Fatal(err)
	}

	_, err = repo.CreateDish(ctx, repository.CreateDishParams{
		Name:    "Pasta",
		Price:   20000,
		Picture: "https://www.allrecipes.com/thmb/EVkTRink6ZvQFts1yXOYTsqQDQw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg",
	})
	if err != nil {
		log.Fatal(err)
	}

	_, err = repo.CreateDish(ctx, repository.CreateDishParams{
		Name:    "Coffee Latte",
		Price:   22000,
		Picture: "https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dwae845f23/images/recipe-Images/cafe-latte1-recipe.jpg?sw=1200&sh=1200&sm=fit",
	})

	if err != nil {
		log.Fatal(err)
	}

}
