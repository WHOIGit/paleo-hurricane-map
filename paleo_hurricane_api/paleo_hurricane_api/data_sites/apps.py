from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class DataSitesConfig(AppConfig):
    name = "paleo_hurricane_api.data_sites"
    verbose_name = _("Data Sites")
