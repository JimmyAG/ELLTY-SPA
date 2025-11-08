#!/bin/bash

set -e

# Start backend
cd backend
npm install
npm run build || true # optional if using ts-node
npm run start &

# Start frontend
cd ../frontend
npm install
npm run build
npm run start
