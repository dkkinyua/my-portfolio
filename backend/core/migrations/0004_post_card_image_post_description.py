# Generated by Django 5.1.1 on 2024-10-01 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_projects_description_alter_post_id_alter_projects_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='card_image',
            field=models.ImageField(blank=True, default='default_image.jpg', null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='post',
            name='description',
            field=models.CharField(default='This is a post, thanks', max_length=350),
        ),
    ]