# Mini Project (Makan Kuy)

## Overview

This is a simple food ordering application built using Golang (backend) and React (frontend). It allows users to browse, select, and order food items.This project is

## Technical Requirements

- Go 1.22.1+
- Postgres SQL

## Installation

1. Open the .env file in the project root directory.
2. Modify the following variables as needed:

```
PORT=3000
DB_URL="postgres://<username>:<password>@<host>:<port>/<database_name>?sslmode=disable"
```

Replace:

- <username>: Your PostgreSQL username (e.g., postgres).
- <password>: Your PostgreSQL password.
- <host>: The database host (e.g., localhost).
- <port>: The database port (default: 5432).
- <database_name>: The name of your database (e.g., mini-project).

Example Configuration:

```
PORT=3000
DB_URL="postgres://admin:mysecretpassword@localhost:5432/my_database?sslmode=disable"
```

3. Save the changes.
4. Run the following command to install dependencies:

```
go mod tidy
```

5. Once installed, run the application with:

```
go run ./cmd/seed/main.go

go run ./cmd/app/main.go
```

Now the application is ready to use!
