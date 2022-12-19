import csv
import math
from paleo_hurricane_api.data_sites.models import Datapoint, DataSite


def run():
    with open("paleo_hurricane_api/data_sites/import_datapoints3.csv") as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        for row in reader:
            print(row)

            try:
                site = DataSite.objects.get(name=row[-1])
            except DataSite.DoesNotExist:
                print(f"No matching Data Site - {row}")
                continue

            sand = None
            event_index = None
            median_age = None
            min_age = None
            max_age = None
            if row[1]:
                sand = row[1]

            if row[2]:
                event_index = row[2]

            if row[3]:
                median_age = row[3]

            if row[4]:
                min_age = row[4]

            if row[5]:
                max_age = row[5]

            try:
                datapoint = Datapoint(
                    depth=row[0],
                    sand=sand,
                    event_index=event_index,
                    median_age=median_age,
                    min_age=min_age,
                    max_age=max_age,
                    data_site=site,
                )
                datapoint.save()
            except:
                continue
