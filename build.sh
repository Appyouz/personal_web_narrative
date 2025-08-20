#!/usr/bin/env bash
# Exit on first error
set -e

# Run Django migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput
