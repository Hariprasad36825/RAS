# Generated by Django 3.1.7 on 2021-04-07 12:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurant', '0027_auto_20210407_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 7, 18, 0, 8, 435186)),
        ),
        migrations.AlterField(
            model_name='purchaselist',
            name='id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='sales',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 7, 18, 0, 8, 436189), null=True),
        ),
    ]