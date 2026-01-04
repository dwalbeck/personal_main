#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE ROLE apiuser CREATEROLE LOGIN PASSWORD 'changeme';
  CREATE GROUP application LOGIN;
  CREATE GROUP dba SUPERUSER CREATEDB CREATEROLE LOGIN;
  GRANT application TO apiuser;

  CREATE EXTENSION IF NOT EXISTS vector;

  CREATE TABLE IF NOT EXISTS portfolio_embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL
  );

  GRANT ALL PRIVILEGES ON DATABASE "personal-ai" TO apiuser;

EOSQL
