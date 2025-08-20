#!/usr/bin/env bash
# Exit on first error
set -e

pip install -r requirements.txt


# Run Django migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create a superuser using the custom management command
python manage.py create_admin
