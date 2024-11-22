include .env
.DEFAULT_GOAL=run


migrate:
	migrate -path db/migrations -database ${DB_URL} -verbose up

migrate-down:
	migrate -path db/migrations -database ${DB_URL} -verbose down

seed:
	go run ./cmd/seed/main.go

build:
	cd ./ui && npm run build
	GOARCH=amd64 go build -o ./bin/app ./cmd/app/main.go

run: build
	./bin/app

debug-ui:
	cd ./ui && npm run dev

debug-app:
	go run ./cmd/app/main.go

clean:
	go clean
	rm ./bin/app
