from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

class TimelineView(LoginRequiredMixin, TemplateView):
    template_name = 'memories/timeline.html'
