from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.company_list),

    path('companies/<int:pk>/', views.CompanyDetail.as_view()),
    path('companies/<int:pk>/vacancies/', views.CompanyVacanciesList.as_view()),
    path('vacancies/', views.VacancyListCreate.as_view()),
    path('vacancies/<int:pk>/', views.VacancyDetail.as_view()),
    path('vacancies/top_ten/', views.TopTenVacancies.as_view()),
]