import csv
import io
from django.contrib.gis import admin
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib import messages
from django.urls import path, reverse
from django.utils.html import format_html
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views.generic import FormView, TemplateView
from .models import *
from .forms import DataSiteForm, DatapointCsvUploadForm


class AttachmentInline(admin.StackedInline):
    model = DataFile
    extra = 0


class DataSiteAdmin(admin.GeoModelAdmin):
    form = DataSiteForm
    inlines = [AttachmentInline]
    list_display = ["name", "location", "compilation", "data_upload"]

    def get_urls(self):
        return [
            path(
                "<int:pk>/data_upload",
                self.admin_site.admin_view(DatapointCsvUploadView.as_view()),
                name=f"data_upload",
            ),
            path(
                "<int:pk>/data_upload_success",
                self.admin_site.admin_view(DatapointCsvUploadSuccessView.as_view()),
                name=f"data_upload_success",
            ),
            *super().get_urls(),
        ]

    def data_upload(self, obj: DataSite):
        url = reverse("admin:data_upload", args=[obj.pk])
        return format_html(f'<a href="{url}">Upload Data</a>')


class DatapointCsvUploadView(PermissionRequiredMixin, FormView):
    form_class = DatapointCsvUploadForm
    permission_required = "data_sites.view_data_site"
    template_name = "admin/data_sites/data_upload.html"
    model = DataSite

    def get_context_data(self, **kwargs):
        data_site = DataSite.objects.get(pk=self.kwargs["pk"])
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts": self.model._meta,
            "data_site": data_site,
        }

    def upload_csv(self, csv_file, data_site):
        # Set up the Django file object for CSV DictReader
        csv_file.seek(0)
        reader = csv.DictReader(io.StringIO(csv_file.read().decode("utf-8")))

        uploader = {"status": "pending", "data": list(), "errors": list()}

        # delete any existing data
        datapoints = data_site.datapoints.all()
        datapoints.delete()
        print("Deleted datapoints")

        for row in reader:
            try:
                row_info = f"Row info: {row['depth']}, {row['sand']}, {row['event_index']}, {row['median_age']}, {row['min_age']}, {row['max_age']}, {row['intense_event_index']}"
            except Exception as e:
                print("ERROR", e, row)
                error = f"Error: CSV headers don't match expected headers - depth, sand, event_index, median_age, min_age, max_age, intense_event_index"
                uploader["errors"].append(error)
                break

            # remove any NaN text
            for key, value in row.items():
                if value == "NaN":
                    row[key] = ""

            depth = None
            sand = None
            event_index = None
            median_age = None
            min_age = None
            max_age = None
            intense_event_index = None

            if row["depth"]:
                depth = row["depth"]

            if row["sand"]:
                sand = row["sand"]

            if row["event_index"]:
                event_index = row["event_index"]

            if row["median_age"]:
                median_age = row["median_age"]

            if row["min_age"]:
                min_age = row["min_age"]

            if row["max_age"]:
                max_age = row["max_age"]

            if row["intense_event_index"]:
                intense_event_index = row["intense_event_index"]

            if not uploader["errors"]:
                datapoint = Datapoint(
                    depth=depth,
                    sand=sand,
                    event_index=event_index,
                    intense_event_index=intense_event_index,
                    median_age=median_age,
                    min_age=min_age,
                    max_age=max_age,
                    data_site=data_site,
                )

                try:
                    datapoint.save()
                except Exception as e:
                    print(e)
                    continue
                # uploader["data"].append(datapoint)

        if uploader["errors"]:
            uploader["status"] = "fail"
            return uploader

        # points = Datapoint.objects.bulk_create(uploader["data"])
        uploader["status"] = "ok"

        return uploader

    def form_valid(self, form):
        print(form.cleaned_data["datapoints_csv"])
        data_site = DataSite.objects.get(pk=self.kwargs["pk"])
        print(data_site)
        # csv_file = self.request.FILES["datapoints_csv"]
        csv_file = form.cleaned_data["datapoints_csv"]

        uploader = self.upload_csv(csv_file, data_site)
        if uploader["status"] == "fail":
            for error in uploader["errors"]:
                messages.error(self.request, error)
            return HttpResponseRedirect(
                reverse("admin:data_upload", args=[self.kwargs["pk"]])
            )

        return super(DatapointCsvUploadView, self).form_valid(form)

    def get_success_url(self):
        print(self.kwargs["pk"])
        return reverse("admin:data_upload_success", args=[self.kwargs["pk"]])


class DatapointCsvUploadSuccessView(TemplateView):
    template_name = "admin/data_sites/data_upload_success.html"
    model = DataSite

    def get_context_data(self, **kwargs):
        data_site = DataSite.objects.get(pk=self.kwargs["pk"])
        return {
            **super().get_context_data(**kwargs),
            **admin.site.each_context(self.request),
            "opts": self.model._meta,
            "data_site": data_site,
        }


class DatapointAdmin(admin.ModelAdmin):
    search_fields = ["data_site"]
    list_display = (
        "data_site",
        "depth",
        "sand",
        "event_index",
        "median_age",
        "min_age",
        "max_age",
    )
    list_filter = ("data_site",)


admin.site.register(Compilation)
admin.site.register(DataSite, DataSiteAdmin)
admin.site.register(Datapoint, DatapointAdmin)
