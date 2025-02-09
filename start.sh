#!/bin/bash

# Start the main application
node server.js &

# Run tests
npm test

# Wait for all background processes to finish
wait