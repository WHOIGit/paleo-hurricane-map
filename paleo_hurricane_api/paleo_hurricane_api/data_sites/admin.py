from django.contrib.gis import admin
from .models import *
from .forms import DataSiteForm

# Register your models here.
class DatasetAdmin(admin.GeoModelAdmin):
    form = DataSiteForm


admin.site.register(DataSite, DatasetAdmin)
