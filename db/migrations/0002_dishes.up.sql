CREATE TABLE dishes (
  id   BIGSERIAL PRIMARY KEY,
  name text      NOT NULL,
  picture text NOT NULL,
  price BIGINT NOT NULL,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
  deleted_at BIGINT
);