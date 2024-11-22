CREATE TABLE users (
  id   BIGSERIAL PRIMARY KEY,
  name text      NOT NULL,
  username text NOT NULL,
  password text NOT NULL,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT
);

CREATE UNIQUE INDEX users_username ON users (username);

