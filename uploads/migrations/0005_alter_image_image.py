# Generated by Django 3.2.3 on 2021-10-04 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0004_auto_20211004_0124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.FileField(upload_to='images'),
        ),
    ]
