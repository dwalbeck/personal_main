#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  CREATE ROLE apiuser WITH LOGIN PASSWORD '@p!u53Rt0k3n';
  CREATE GROUP application LOGIN;
  CREATE GROUP dba SUPERUSER CREATEDB CREATEROLE LOGIN;
  GRANT application TO apiuser;

  CREATE DATABASE personal-ai WITH OWNER = apiuser;

EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS vector;

  CREATE TABLE IF NOT EXISTS portfolio_embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL
  );

  GRANT ALL PRIVILEGES ON DATABASE "personal_ai" TO apiuser;
  GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE "portfolio_embeddings" TO apiuser;
  GRANT SELECT, UPDATE ON SEQUENCE "portfolio_embeddings_id_seq" TO apiuser;

  CREATE ROLE davey WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD 'kier*33';
  GRANT dba TO davey;

EOSQL