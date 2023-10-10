from django.contrib.gis.db import models
from django.contrib.gis.geos import Polygon


class Compilation(models.Model):

    study_title = models.CharField(max_length=100)
    location = models.CharField(max_length=100, null=False, blank=True)
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
    document = models.FileField(upload_to="compilations/", null=True, blank=True)

    class Meta:
        ordering = ["location"]

    def __str__(self):
        return f"{self.location}"


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

    YEARS_0_3 = "0-3 years"
    YEARS_3_30 = "3-30 years"
    YEARS_30 = ">30 years"
    RESOLUTION_CHOICES = [
        (YEARS_0_3, "0-3 years"),
        (YEARS_3_30, "3-30 years"),
        (YEARS_30, ">30 years"),
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
    core_length = models.DecimalField(
        max_digits=6, decimal_places=3, null=True, blank=True
    )
    proxy_type = models.CharField(
        max_length=30,
        choices=PROXY_CHOICES,
        default=SEDIMENT,
    )
    compilation = models.ForeignKey(
        Compilation,
        related_name="data_sites",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    resolution = models.CharField(
        max_length=20,
        choices=RESOLUTION_CHOICES,
        default=SEDIMENT,
        null=False,
        blank=True,
    )
    depth_y_axis_label = models.CharField(
        max_length=100, null=False, blank=True, default="Sand (mg/cm3)"
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
    sand = models.DecimalField(max_digits=7, decimal_places=4, null=True, blank=True)
    event_index = models.IntegerField(null=True, blank=True)
    intense_event_index = models.IntegerField(null=True, blank=True)
    median_age = models.DecimalField(
        max_digits=7, decimal_places=3, null=True, blank=True
    )
    min_age = models.DecimalField(max_digits=7, decimal_places=3, null=True, blank=True)
    max_age = models.DecimalField(max_digits=7, decimal_places=3, null=True, blank=True)

    class Meta:
        ordering = ["depth"]

    def __str__(self):
        return f"{self.data_site.name} - Depth: {self.depth}"


class DataFile(models.Model):
    data_set = models.ForeignKey(
        DataSite, related_name="data_files", on_delete=models.CASCADE
    )
    file = models.FileField(upload_to="data_files")
