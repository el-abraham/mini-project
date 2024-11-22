package middleware

import (
	"net/http"
	"strings"

	"github.com/el-abraham/mini-project/utils"
	"github.com/gin-gonic/gin"
)

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			return

		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		jwt := utils.NewJWT()
		_, err := jwt.ParseToken(tokenString)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
