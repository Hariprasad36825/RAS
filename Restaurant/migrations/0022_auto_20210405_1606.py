# Generated by Django 3.1.7 on 2021-04-05 10:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurant', '0021_auto_20210405_1149'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='complementory_list',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 5, 16, 6, 9, 928329), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='sales',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 5, 16, 6, 9, 928329), null=True),
        ),
    ]