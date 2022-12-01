from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from paleo_hurricane_api.users.api.views import UserViewSet
from paleo_hurricane_api.data_sites.api.views import DataSiteViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("data_sites", DataSiteViewSet)


app_name = "api"
urlpatterns = router.urls
