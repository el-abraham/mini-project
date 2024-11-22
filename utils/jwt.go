package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWT struct {
	SigningKey []byte
}

var (
	ErrTokenExpired     = errors.New("Token is expired")
	ErrTokenNotValidYet = errors.New("Token not active yet")
	ErrTokenMalformed   = errors.New("That's not even a token")
	ErrTokenInvalid     = errors.New("Couldn't handle this token:")
)

func NewJWT() *JWT {
	return &JWT{
		[]byte(GetEnv("SIGNING_KEY", "secret")),
	}
}

func (j *JWT) CreateToken(userId int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString(j.SigningKey)
}

func (j *JWT) ParseToken(tokenString string) (*jwt.MapClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(token *jwt.Token) (i interface{}, e error) {
		return j.SigningKey, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenMalformed) {
			return nil, ErrTokenMalformed
		} else if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, ErrTokenExpired
		} else if errors.Is(err, jwt.ErrTokenNotValidYet) {
			return nil, ErrTokenNotValidYet
		} else {
			return nil, ErrTokenInvalid
		}
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return &claims, nil
	}

	return nil, ErrTokenInvalid
}
