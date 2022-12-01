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


class Datapoint(models.Model):
    data_site = models.ForeignKey(
        DataSite,
        related_name="datapoints",
        on_delete=models.CASCADE,
    )
    depth = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    sand = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    event_index = models.IntegerField(null=True, blank=True)
    median_age = models.DecimalField(
        max_digits=5, decimal_places=1, null=True, blank=True
    )
    min_age = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    max_age = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)

    class Meta:
        ordering = ["depth"]

    def __str__(self):
        return f"{self.data_site.name} - Depth: {self.depth}"
