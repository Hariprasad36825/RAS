# Generated by Django 3.1.7 on 2021-04-05 06:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurant', '0019_auto_20210403_1243'),
    ]

    operations = [
        migrations.AddField(
            model_name='sales',
            name='id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 5, 11, 47, 23, 54593), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='sales',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 5, 11, 47, 23, 54593), null=True),
        ),
    ]
