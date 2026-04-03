#!/bin/sh

# Synchronize database schema
npm exec prisma db push --accept-data-loss

# Start the production server
node server.js
