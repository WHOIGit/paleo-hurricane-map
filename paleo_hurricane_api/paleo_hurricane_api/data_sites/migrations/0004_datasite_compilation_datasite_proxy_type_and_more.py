# Generated by Django 4.0.8 on 2022-12-14 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_sites', '0003_datasite_publication_doi_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='datasite',
            name='compilation',
            field=models.CharField(choices=[('Bahamas Compilation', 'Bahamas Compilation'), ('New England Compilation', 'New England Compilation'), ('Florida Gulf of Mexico Compilation', 'Florida Gulf of Mexico Compilation'), ('Mann et al. 2009 Compilation', 'Mann et al. 2009 Compilation'), ('N/A', 'N/A')], default='N/A', max_length=50),
        ),
        migrations.AddField(
            model_name='datasite',
            name='proxy_type',
            field=models.CharField(choices=[('Sediment', 'Sediment'), ('Historical Archive', 'Historical Archive'), ('Tree Ring', 'Tree Ring'), ('Speleothem/Corals', 'Speleothem/Corals')], default='Sediment', max_length=30),
        ),
        migrations.AddField(
            model_name='datasite',
            name='resolution',
            field=models.CharField(blank=True, choices=[('0-20 years', '0-20 years'), ('21-100 years', '21-100 years'), ('>100 years', '>100 years')], default='Sediment', max_length=20),
        ),
    ]