#!/bin/bash

echo "Testing URL Shortener API..."

# 1. Shorten a URL
echo "\n1. Shortening 'https://www.google.com'..."
RESPONSE=$(curl -s -X POST http://localhost:3001/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.google.com"}')

echo "Response: $RESPONSE"

# Extract code using grep/sed (simple parsing)
CODE=$(echo $RESPONSE | grep -o '"code":"[^"]*"' | cut -d'"' -f4)

if [ -z "$CODE" ]; then
    echo "Error: Failed to get short code"
    exit 1
fi

echo "Short Code: $CODE"

# 2. Test Redirection (fetch headers only to check 302 Found)
echo "\n2. Testing redirection for code $CODE..."
curl -v http://localhost:3001/$CODE 2>&1 | grep "Location"

echo "\nDone."
