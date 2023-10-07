# Generated by Django 4.0.8 on 2022-12-17 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_sites', '0006_alter_datasite_core_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datapoint',
            name='max_age',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AlterField(
            model_name='datapoint',
            name='median_age',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AlterField(
            model_name='datapoint',
            name='min_age',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AlterField(
            model_name='datapoint',
            name='sand',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=6, null=True),
        ),
    ]