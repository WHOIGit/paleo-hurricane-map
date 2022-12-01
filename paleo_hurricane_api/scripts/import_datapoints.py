import csv
from paleo_hurricane_api.data_sites.models import Datapoint, DataSite


def run():
    with open("paleo_hurricane_api/data_sites/import_datapoints.csv") as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        for row in reader:
            print(row)

            try:
                site = DataSite.objects.get(name=row[-1])
            except DataSite.DoesNotExist:
                print(f"No matching Data Site - {row}")
                continue

            datapoint = Datapoint(
                depth=row[0],
                sand=row[1],
                event_index=row[2],
                median_age=row[3],
                min_age=row[4],
                max_age=row[5],
                data_site=site,
            )
            datapoint.save()
