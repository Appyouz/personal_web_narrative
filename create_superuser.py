import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
    print("Superuser created")
else:
    print("Superuser already exists")
