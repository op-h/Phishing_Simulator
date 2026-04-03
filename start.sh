#!/bin/sh

# Synchronize database schema
npx prisma@6.4.1 db push --accept-data-loss

# Start the production server
node server.js
