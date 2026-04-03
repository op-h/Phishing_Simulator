#!/bin/sh

# Synchronize database schema and seed templates
npx prisma@6.4.1 db push --accept-data-loss --skip-generate
npx prisma@6.4.1 db seed

# Start the production server
node server.js
