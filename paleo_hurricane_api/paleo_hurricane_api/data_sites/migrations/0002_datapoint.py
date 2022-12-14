# Generated by Django 4.0.8 on 2022-11-30 18:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data_sites', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Datapoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('depth', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('sand', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('event_index', models.IntegerField(blank=True, null=True)),
                ('median_age', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('min_age', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('max_age', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('data_site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='datapoints', to='data_sites.datasite')),
            ],
            options={
                'ordering': ['depth'],
            },
        ),
    ]
