from django.contrib.gis.db import models
from django.contrib.gis.geos import Polygon


class DataSite(models.Model):
    SEDIMENT = "Sediment"
    ARCHIVE = "Historical Archive"
    TREE_RING = "Tree Ring"
    CORALS = "Speleothem/Corals"
    PROXY_CHOICES = [
        (SEDIMENT, "Sediment"),
        (ARCHIVE, "Historical Archive"),
        (TREE_RING, "Tree Ring"),
        (CORALS, "Speleothem/Corals"),
    ]

    BAHAMAS = "Bahamas Compilation"
    NEW_ENGLAND = "New England Compilation"
    FLORIDA = "Florida Gulf of Mexico Compilation"
    MANN = "Mann et al. 2009 Compilation"
    NA = "N/A"
    COMP_CHOICES = [
        (BAHAMAS, "Bahamas Compilation"),
        (NEW_ENGLAND, "New England Compilation"),
        (FLORIDA, "Florida Gulf of Mexico Compilation"),
        (MANN, "Mann et al. 2009 Compilation"),
        (NA, "N/A"),
    ]

    YEARS_0_20 = "0-20 years"
    YEARS_21_100 = "21-100 years"
    YEARS_100 = ">100 years"
    RESOLUTION_CHOICES = [
        (YEARS_0_20, "0-20 years"),
        (YEARS_21_100, "21-100 years"),
        (YEARS_100, ">100 years"),
    ]

    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, null=False, blank=True)
    geom_point = models.PointField(srid=4326, null=True, blank=True)
    geom_line = models.LineStringField(srid=4326, null=True, blank=True)
    geom_polygon = models.PolygonField(srid=4326, null=True, blank=True)
    authors = models.CharField(max_length=255, null=False, blank=True)
    publication_title = models.CharField(max_length=255, null=False, blank=True)
    publication_year = models.IntegerField(null=True, blank=True)
    publication_journal = models.CharField(max_length=100, null=False, blank=True)
    publication_volume = models.CharField(max_length=100, null=False, blank=True)
    publication_edition = models.CharField(max_length=100, null=False, blank=True)
    publication_issue = models.CharField(max_length=100, null=False, blank=True)
    publication_pages = models.CharField(max_length=100, null=False, blank=True)
    publication_report_number = models.CharField(max_length=100, null=False, blank=True)
    publication_doi = models.CharField(max_length=100, null=False, blank=True)
    online_resource = models.CharField(max_length=100, null=False, blank=True)
    oldest_year = models.IntegerField(null=True, blank=True)
    newest_year = models.IntegerField(null=True, blank=True)
    core_length = models.DecimalField(max_digits=6, decimal_places=3)
    proxy_type = models.CharField(
        max_length=30,
        choices=PROXY_CHOICES,
        default=SEDIMENT,
    )
    compilation = models.CharField(
        max_length=50,
        choices=COMP_CHOICES,
        null=False,
        blank=True,
    )
    resolution = models.CharField(
        max_length=20,
        choices=RESOLUTION_CHOICES,
        default=SEDIMENT,
        null=False,
        blank=True,
    )

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
