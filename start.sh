#!/bin/bash

# Kill background processes on exit
trap 'kill 0' SIGINT

echo "Starting Backend..."
cd backend && npm start &

echo "Starting Frontend..."
cd frontend && npm run dev &

wait
