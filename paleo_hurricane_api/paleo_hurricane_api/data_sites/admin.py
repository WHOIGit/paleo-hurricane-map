from django.contrib.gis import admin
from .models import *
from .forms import DataSiteForm


class AttachmentInline(admin.StackedInline):
    model = DataFile
    extra = 0


class DataSiteAdmin(admin.GeoModelAdmin):
    form = DataSiteForm
    inlines = [AttachmentInline]


admin.site.register(Compilation)
admin.site.register(DataSite, DataSiteAdmin)
admin.site.register(Datapoint, admin.ModelAdmin)
