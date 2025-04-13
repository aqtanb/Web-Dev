from django.core.management.base import BaseCommand
from api.models import Company, Vacancy

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        Company.objects.all().delete()
        Vacancy.objects.all().delete()

        companies = [
            {
                "name": "Kaspi Bank",
                "description": "Leading financial and technology company in Kazakhstan.",
                "city": "Almaty",
                "address": "123 Abay Avenue, Almaty"
            },
            {
                "name": "Halyk Bank",
                "description": "One of the largest banks in Kazakhstan.",
                "city": "Almaty",
                "address": "456 Dostyk Street, Almaty"
            },
            {
                "name": "Air Astana",
                "description": "National airline of Kazakhstan.",
                "city": "Astana",
                "address": "789 Nur-Sultan Airport, Astana"
            },
            {
                "name": "KazMunayGas",
                "description": "National oil and gas company of Kazakhstan.",
                "city": "Astana",
                "address": "10 Kabanbay Batyr Avenue, Astana"
            }
        ]

        created_companies = []
        for company_data in companies:
            company = Company.objects.create(**company_data)
            created_companies.append(company)
            self.stdout.write(f'Created company: {company.name}')

        vacancies = [
            {
                "name": "Senior Software Engineer",
                "description": "Develop backend services for banking systems.",
                "salary": 800000.00,
                "company": created_companies[0]  # Kaspi Bank
            },
            {
                "name": "Mobile App Developer",
                "description": "Build iOS/Android apps for Halyk Bank.",
                "salary": 750000.00,
                "company": created_companies[1]  # Halyk Bank
            },
            {
                "name": "Flight Operations Manager",
                "description": "Manage daily flight operations for Air Astana.",
                "salary": 1200000.00,
                "company": created_companies[2]  # Air Astana
            },
            {
                "name": "Petroleum Engineer",
                "description": "Oversee oil extraction projects.",
                "salary": 1500000.00,
                "company": created_companies[3]  # KazMunayGas
            },
            {
                "name": "IT Support Specialist",
                "description": "Provide technical support for Kaspi Bank employees.",
                "salary": 500000.00,
                "company": created_companies[0]  # Kaspi Bank
            }
        ]

        for vacancy_data in vacancies:
            Vacancy.objects.create(**vacancy_data)
            self.stdout.write(f'Created vacancy: {vacancy_data["name"]}')

        self.stdout.write(self.style.SUCCESS('Successfully populated static data!'))