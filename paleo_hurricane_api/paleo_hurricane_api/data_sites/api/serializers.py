from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ..models import DataSite, Datapoint


class DatapointSerializer(serializers.ModelSerializer):
    """A class to serialize locations as GeoJSON compatible data"""

    class Meta:
        model = Datapoint
        exclude = ["id", "data_site"]


class DataSiteListSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = DataSite
        geo_field = "geom_point"
        fields = [
            "id",
            "name",
            "location",
            "geom_point",
            "geom_line",
            "geom_polygon",
            "authors",
            "publication_title",
            "publication_year",
            "online_resource",
            "oldest_year",
            "newest_year",
            "core_length",
        ]


class DataSiteDetailSerializer(DataSiteListSerializer):
    # Use separate serializer for Detail view so "data" is returned as well
    data = DatapointSerializer(source="datapoints", many=True)

    class Meta(DataSiteListSerializer.Meta):
        fields = DataSiteListSerializer.Meta.fields + [
            "data",
        ]
