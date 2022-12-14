# Generated by Django 4.0.8 on 2022-12-14 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_sites', '0002_datapoint'),
    ]

    operations = [
        migrations.AddField(
            model_name='datasite',
            name='publication_doi',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='datasite',
            name='publication_edition',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='datasite',
            name='publication_issue',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='datasite',
            name='publication_journal',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='datasite',
            name='publication_pages',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='datasite',
            name='publication_report_number',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='datasite',
            name='publication_volume',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
