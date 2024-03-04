from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.db.models import Q
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
    record_length = serializers.SerializerMethodField()
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
            "record_length",
            "data_files",
            "depth_y_axis_label",
        ]

    def get_record_length(self, obj):
        try:
            timespan = abs(obj.newest_year - obj.oldest_year)
            return timespan
        except:
            return None


class DataSiteDetailSerializer(DataSiteListSerializer):
    # Use separate serializer for Detail view so "data" is returned as well
    data = DatapointSerializer(source="datapoints", many=True)
    compilation_detail = CompilationSerializer(source="compilation")
    has_depth_data = serializers.SerializerMethodField()
    has_event_data = serializers.SerializerMethodField()
    has_age_model_data = serializers.SerializerMethodField()

    class Meta(DataSiteListSerializer.Meta):
        fields = DataSiteListSerializer.Meta.fields + [
            "compilation_detail",
            "has_depth_data",
            "has_event_data",
            "has_age_model_data",
            "data",
        ]

    def get_has_depth_data(self, obj):
        try:
            data = obj.datapoints.filter(sand__isnull=False)
            if data.exists():
                return True
            return False
        except:
            return False

    def get_has_event_data(self, obj):
        try:
            data = obj.datapoints.filter(event_index__isnull=False)
            if data.exists():
                return True
            return False
        except:
            return False

    def get_has_age_model_data(self, obj):
        try:
            # check for depth data first
            data = obj.datapoints.filter(depth__isnull=False)
            if not data.exists():
                return False

            data = obj.datapoints.filter(
                Q(median_age__isnull=False)
                | Q(max_age__isnull=False)
                | Q(min_age__isnull=False)
                | Q(depth__isnull=False)
            )
            if data.exists():
                return True
            return False
        except:
            return False
