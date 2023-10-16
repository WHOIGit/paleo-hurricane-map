from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from ..models import DataSite, Datapoint, DataFile, Compilation


class CompilationSerializer(serializers.ModelSerializer):
    """A class to serialize locations as GeoJSON compatible data"""

    class Meta:
        model = Compilation
        fields = "__all__"


class DatapointSerializer(serializers.ModelSerializer):
    """A class to serialize locations as GeoJSON compatible data"""

    class Meta:
        model = Datapoint
        exclude = ["id", "data_site"]


class DataFileSerializer(serializers.ModelSerializer):
    """A class to serialize locations as GeoJSON compatible data"""

    class Meta:
        model = DataFile
        fields = ["file"]


class DataSiteListSerializer(GeoFeatureModelSerializer):
    timespan = serializers.SerializerMethodField("get_timespan")
    data_files = DataFileSerializer(many=True)

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
            "proxy_type",
            "compilation",
            "resolution",
            "timespan",
            "data_files",
            "depth_y_axis_label",
        ]

    def get_timespan(self, obj):
        try:
            timespan = abs(obj.newest_year - obj.oldest_year)
            return timespan
        except:
            return None


class DataSiteDetailSerializer(DataSiteListSerializer):
    # Use separate serializer for Detail view so "data" is returned as well
    data = DatapointSerializer(source="datapoints", many=True)
    compilation_detail = CompilationSerializer(source="compilation")

    class Meta(DataSiteListSerializer.Meta):
        fields = DataSiteListSerializer.Meta.fields + [
            "compilation_detail",
            "data",
        ]
