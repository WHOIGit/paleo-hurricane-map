from django.contrib.gis import admin
from .models import *
from .forms import DataSiteForm

# Register your models here.
class DataSiteAdmin(admin.GeoModelAdmin):
    form = DataSiteForm


admin.site.register(DataSite, DataSiteAdmin)
admin.site.register(Datapoint, admin.ModelAdmin)
