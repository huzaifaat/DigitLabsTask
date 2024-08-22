from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("task2/", views.task2, name="task2"),  # Fixed URL pattern
]
