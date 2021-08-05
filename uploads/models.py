from tkinter.constants import TRUE

from django.db import models

from .utils import get_filtered_image
from PIL import Image as PIL_Image
import numpy as np
from io import BytesIO
from django.core.files.base import ContentFile
from django.conf import settings




ACTION_CHOICES= (
    ('NO_FILTER', 'no filter'),
    ('COLORIZED', 'colorized'),
    ('GRAYSCALE', 'grayscale'),
    ('BLURRED', 'blurred'),
    ('BINARY', 'binary'),
    ('INVERT', 'invert'),
)


class Image(models.Model):
    image = models.ImageField(upload_to='media/images')
    action = models.CharField(max_length=50, choices=ACTION_CHOICES, null=TRUE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        
        # open image
        pil_img = PIL_Image.open(self.image)

        # convert the image to array and do some processing
        cv_img = np.array(pil_img)
        img = get_filtered_image(cv_img, self.action)


        # convert back to pil image
        im_pil = PIL_Image.fromarray(img)

        # save
        buffer = BytesIO()
        im_pil.save(buffer, format='png')
        image_png = buffer.getvalue()

        self.image.save(str(self.image), ContentFile(image_png), save=False)

        super().save(*args, **kwargs)