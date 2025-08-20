from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    help = 'Disable superuser auto-creation'
    
    def handle(self, *args, **options):
        # This would ideally update a database setting or environment variable
        # For simplicity, we'll just output instructions
        self.stdout.write(
            self.style.WARNING(
                "To disable superuser auto-creation, set SUPERUSER_AUTO_CREATE=false "
                "in your environment variables and redeploy."
            )
        )
