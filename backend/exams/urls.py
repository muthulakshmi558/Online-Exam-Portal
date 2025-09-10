from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExamViewSet, StudentExamResultViewSet

router = DefaultRouter()
router.register('exams', ExamViewSet, basename='exams')
router.register('results', StudentExamResultViewSet, basename='results')

urlpatterns = [
    path('', include(router.urls)),
]
