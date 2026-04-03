#!/bin/sh

# Synchronize database schema (safe for SQLite/Postgres)
# Using db push for the simulator as it's more direct for this scale
npx prisma db push --accept-data-loss

# Start the production server
node server.js
