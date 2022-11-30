from django.contrib.gis.db import models
from django.contrib.gis.geos import Polygon


class DataSite(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, null=False, blank=True)
    geom_point = models.PointField(srid=4326, null=True, blank=True)
    geom_line = models.LineStringField(srid=4326, null=True, blank=True)
    geom_polygon = models.PolygonField(srid=4326, null=True, blank=True)
    authors = models.CharField(max_length=255, null=False, blank=True)
    publication_title = models.CharField(max_length=255, null=False, blank=True)
    publication_year = models.IntegerField(null=True, blank=True)
    online_resource = models.CharField(max_length=100, null=False, blank=True)
    oldest_year = models.IntegerField(null=True, blank=True)
    newest_year = models.IntegerField(null=True, blank=True)
    core_length = models.DecimalField(max_digits=6, decimal_places=3)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
