from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Memory

class TimelineView(LoginRequiredMixin, TemplateView):
    template_name = 'memories/timeline.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Fetch all memories from the database and order them
        context['memories'] = Memory.objects.all().order_by('id')
        return context
