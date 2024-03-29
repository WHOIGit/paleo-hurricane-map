from django import forms
from django.contrib.gis.geos import Point

from .models import DataSite


class DataSiteForm(forms.ModelForm):

    latitude = forms.FloatField(
        min_value=-90,
        max_value=90,
        required=False,
    )
    longitude = forms.FloatField(
        min_value=-180,
        max_value=180,
        required=False,
    )

    class Meta(object):
        model = DataSite
        fields = [
            "name",
            "location",
            "latitude",
            "longitude",
            "proxy_type",
            "compilation",
            "resolution",
            "geom_point",
            # "geom_line",
            # "geom_polygon",
            "authors",
            "publication_title",
            "publication_year",
            "publication_journal",
            "publication_volume",
            "publication_edition",
            "publication_issue",
            "publication_pages",
            "publication_report_number",
            "publication_doi",
            "online_resource",
            "oldest_year",
            "newest_year",
            "core_length",
            "depth_y_axis_label",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        coordinates = self.initial.get("geom_point", None)
        if isinstance(coordinates, Point):
            self.initial["longitude"], self.initial["latitude"] = coordinates.tuple

    def clean(self):
        data = super().clean()
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        geom_point = data.get("geom_point")
        if latitude and longitude:
            data["geom_point"] = Point(longitude, latitude)
        return data


class DatapointCsvUploadForm(forms.Form):
    datapoints_csv = forms.FileField()
