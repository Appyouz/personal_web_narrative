from django.db import models
from cloudinary.models import CloudinaryField


class Memory(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = CloudinaryField('image')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Memories'
