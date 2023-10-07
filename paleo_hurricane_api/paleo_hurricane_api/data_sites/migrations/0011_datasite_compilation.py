# Generated by Django 4.0.8 on 2023-10-07 18:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data_sites', '0010_remove_datasite_compilation'),
    ]

    operations = [
        migrations.AddField(
            model_name='datasite',
            name='compilation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='data_sites', to='data_sites.compilation'),
        ),
    ]