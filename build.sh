#!/usr/bin/env bash
# Exit on first error
set -e

# Run Django migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create a superuser non-interactively by piping the password
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')" | python manage.py shell
