from django.contrib import admin
from .models import Exam, Question, StudentExamResult

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'duration')
    search_fields = ('title',)
    inlines = [QuestionInline]

@admin.register(StudentExamResult)
class StudentExamResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'exam', 'score', 'created_at')
    list_filter = ('exam', 'created_at')
