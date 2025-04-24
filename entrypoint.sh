#!/bin/sh

echo "window.env = { VITE_BACK_END: '${VITE_BACK_END:-http://localhost:8080}' };" > /usr/share/nginx/html/config.js

exec "$@"
