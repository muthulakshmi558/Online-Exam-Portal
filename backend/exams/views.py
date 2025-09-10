from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Exam, Question, StudentExamResult
from .serializers import ExamSerializer, QuestionSerializer, StudentExamResultSerializer
from .permissions import IsAdminAPIKey
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Exam
from .serializers import ExamSerializer


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'DELETE']:
            return [IsAdminUser() | IsAdminAPIKey()]
        return [IsAuthenticated()]

class StudentExamResultViewSet(viewsets.ModelViewSet):
    queryset = StudentExamResult.objects.all()
    serializer_class = StudentExamResultSerializer
    permission_classes = [IsAuthenticated]

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated] 