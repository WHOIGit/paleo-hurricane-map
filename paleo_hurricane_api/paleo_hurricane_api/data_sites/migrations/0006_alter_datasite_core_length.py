# Generated by Django 4.0.8 on 2022-12-17 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_sites', '0005_alter_datasite_compilation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datasite',
            name='core_length',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=6, null=True),
        ),
    ]