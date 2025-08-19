from django.db import models
from cloudinary.models import CloudinaryField


class Memory(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Memories'


class MemoryImage(models.Model):
    memory = models.ForeignKey(Memory, on_delete=models.CASCADE, related_name='images')
    image = CloudinaryField('image')
    comment = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'Image for {self.memory.title}'


class AppreciationImage(models.Model):
    image = CloudinaryField('image')
    comment = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.comment if self.comment else 'Appreciation Image'
