# Generated by Django 3.1.7 on 2021-04-05 11:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurant', '0022_auto_20210405_1606'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyConsumption',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ingredient_id', models.IntegerField(null=True)),
                ('quantity', models.FloatField(null=True)),
                ('date', models.DateField(default=datetime.date(2021, 4, 5))),
            ],
            options={
                'verbose_name_plural': 'DailyConsumption',
                'db_table': 'DailyConsumption',
                'managed': True,
            },
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 5, 17, 27, 41, 626321), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='sales',
            name='date',
            field=models.DateTimeField(db_column='DATE', default=datetime.datetime(2021, 4, 5, 17, 27, 41, 626321), null=True),
        ),
    ]
