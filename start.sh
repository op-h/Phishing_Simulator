#!/bin/sh

# Synchronize database schema (safe for SQLite/Postgres)
export DATABASE_URL=${DATABASE_URL:-"file:./dev.db"}
npm exec prisma db push --accept-data-loss

# Start the production server
node server.js
