from rest_framework import viewsets, status
from ..models import DataSite
from .serializers import DataSiteListSerializer, DataSiteDetailSerializer


class DataSiteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DataSite.objects.all()
    serializer_class = DataSiteListSerializer
    detail_serializer_class = DataSiteDetailSerializer

    # return different sets of fields if the request is list all or retrieve one,
    # so use two different serializers
    def get_serializer_class(self):
        if self.action == "retrieve":
            if hasattr(self, "detail_serializer_class"):
                return self.detail_serializer_class

        return super(DataSiteViewSet, self).get_serializer_class()
