from tkinter.constants import TRUE

from PIL import Image as Img
from PIL import ImageTk

from tkinter import *
from django.db import models
from numpy.core.defchararray import array

from .utils import get_filtered_image
import numpy as np
from io import BytesIO
from django.core.files.base import ContentFile





ACTION_CHOICES= (
    ('NO_FILTER', 'no filter'),
    ('COLORIZED', 'colorized'),
    ('GRAYSCALE', 'grayscale'),
    ('BLURRED', 'blurred'),
    ('BINARY', 'binary'),
    ('INVERT', 'invert'),
)


class Image(models.Model):
    image = models.FileField(upload_to='images')
    action = models.CharField(max_length=50, choices=ACTION_CHOICES, null=TRUE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):

        # open image
        # fp = cv2.imread('./images/self.image')
        pil_img = Img.open(self.image)
        

        # convert the image to array and do some processing
        cv_img = np.array(pil_img)
        print(type(cv_img))
        self.action = 'COLOR_DISTANCE'
        filtered_img = get_filtered_image(cv_img, self.action)


        # convert back to pil image
        print(type(filtered_img))
        print(self.action)
        print('aaaaaaaaaaaaaa')
        im_pil = Img.fromarray(filtered_img)

        # save
        buffer = BytesIO()
        im_pil.save(buffer, format='png')
        image_png = buffer.getvalue()

        self.image.save(str(self.image), ContentFile(image_png), save=False)

        super().save(*args, **kwargs)

