from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import AppreciationImage, Memory, ChapterMusic

class TimelineView(LoginRequiredMixin, TemplateView):
    template_name = 'memories/timeline.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Fetch all memories from the database and order them
        context['memories'] = Memory.objects.all().order_by('id')

        # Fetch all appreciation images from the database
        context['appreciation_images'] = AppreciationImage.objects.all().order_by('id')

        # Pass music URLs
        chapter_music = {}
        for music in ChapterMusic.objects.all():
            chapter_music[music.chapter] = music.music_file.url
        context['chapter_music'] = chapter_music

        return context
