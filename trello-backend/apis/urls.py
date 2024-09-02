from django.urls import include, path

urlpatterns = [
    path('kanban/', include('apis.kanban.urls')),
]