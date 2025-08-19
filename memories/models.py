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


class ChapterMusic(models.Model):
    CHAPTER_CHOICES = [
        ('chapter1', 'Chapter 1'),
        ('chapter2', 'Chapter 2'),
        ('chapter3', 'Chapter 3'),
        ('post-chapter3', 'Post Chapter 3'),
    ]

    chapter = models.CharField(max_length=20, choices=CHAPTER_CHOICES, unique=True)
    music_file = CloudinaryField('audio', resource_type='video')  # use 'video' for audio/video files

    def __str__(self):
        return f"{self.get_chapter_display()}"
