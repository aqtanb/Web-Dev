from django.core.management.base import BaseCommand

from lab8.shop_back.api.models import Category, Product


class Command(BaseCommand):
    help = 'Populate your database with initial categories and products'

    def handle(self, *args, **kwargs):
        data = [
            {
                'name': 'Electronics',
                'products': [
                    {
                        'name': 'Apple iPhone 13 128GB Black',
                        'price': 399999,
                        'description': 'Experience the power of Apple with the iPhone 13 128GB in sleek black.',
                        'count': 15,
                        'is_active': True
                    },
                    {
                        'name': 'Xiaomi Redmi 13C 8GB/256GB Black',
                        'price': 99999,
                        'description': 'Affordable performance with Xiaomi Redmi 13C.',
                        'count': 25,
                        'is_active': True
                    },
                    {
                        'name': 'Samsung Galaxy A55 5G 8GB/256GB Dark Blue',
                        'price': 169999,
                        'description': 'Sleek and powerful Samsung Galaxy A55 5G.',
                        'count': 20,
                        'is_active': True
                    },
                ]
            },
            {
                'name': 'Books',
                'products': [
                    {
                        'name': 'The Great Gatsby',
                        'price': 2999,
                        'description': 'Classic novel by F. Scott Fitzgerald.',
                        'count': 50,
                        'is_active': True
                    },
                    {
                        'name': '1984',
                        'price': 2499,
                        'description': 'Dystopian classic by George Orwell.',
                        'count': 60,
                        'is_active': True
                    },
                    {
                        'name': 'To Kill a Mockingbird',
                        'price': 2799,
                        'description': 'A novel by Harper Lee.',
                        'count': 40,
                        'is_active': True
                    },
                ]
            },
            {
                'name': 'Clothing',
                'products': [
                    {
                        'name': 'Men\'s Casual Shirt',
                        'price': 6999,
                        'description': 'Comfortable and stylish casual shirt.',
                        'count': 30,
                        'is_active': True
                    },
                    {
                        'name': 'Women\'s Summer Dress',
                        'price': 8999,
                        'description': 'Light and breezy summer dress.',
                        'count': 25,
                        'is_active': True
                    },
                    {
                        'name': 'Kids\' T-Shirt',
                        'price': 1999,
                        'description': 'Colorful T-shirt for kids.',
                        'count': 35,
                        'is_active': True
                    },
                ]
            },
            {
                'name': 'Toys',
                'products': [
                    {
                        'name': 'LEGO Classic Bricks',
                        'price': 14999,
                        'description': 'Creative LEGO building bricks.',
                        'count': 15,
                        'is_active': True
                    },
                    {
                        'name': 'Remote Control Car',
                        'price': 9999,
                        'description': 'Exciting RC car for kids.',
                        'count': 20,
                        'is_active': True
                    },
                    {
                        'name': 'Stuffed Animal Bear',
                        'price': 4999,
                        'description': 'Soft and cuddly stuffed bear.',
                        'count': 40,
                        'is_active': True
                    },
                ]
            }
        ]

        for category_data in data:
            category, _ = Category.objects.get_or_create(name=category_data['name'])
            for product_data in category_data['products']:
                Product.objects.get_or_create(category=category, **product_data)

        self.stdout.write(self.style.SUCCESS("Successfully populated the database!"))
