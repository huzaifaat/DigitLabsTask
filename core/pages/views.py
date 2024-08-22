from django.shortcuts import render


def home(request):
    return render(request, "home.html")


def task2(request):
    return render(request, "task2.html")
