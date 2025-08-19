from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # login page. Django's built-in LoginView handles everything for us.
    path('login/', auth_views.LoginView.as_view(template_name='memories/login.html'), name='login'),

    # logout page.
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),

    # The main page that shows the timeline.
    path('', views.TimelineView.as_view(), name='timeline'),
]
