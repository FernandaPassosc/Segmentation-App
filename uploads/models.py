from tkinter.constants import TRUE
from django.db import models
from .utils import get_filtered_image
from PIL import Image as _pilImage
import numpy as np
from io import BytesIO
from django.core.files.base import ContentFile

#from cv2.ximgproc import createStructuredEdgeDetection



ACTION_CHOICES= (
    ('COLOR_DISTANCE', 'COLORIZED'),
    ('GRADENT_VARIATION', 'Gradent variation'),
    ('GRADIENT_VARIATION_NORM', 'Gradent variation'),
    ('SUM_GRADIENTE_VARIATION', 'Sum gradient variation'),
)

class Image(models.Model):
    image = models.FileField(upload_to='images')
   # action = models.CharField(max_length=50, choices=ACTION_CHOICES, null=TRUE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    # def save(self, *args, **kwargs):
        
    #     open image
    #     pil_img = _pilImage.open(self.image)

    #     convert the image to array and do some processing
    #     cv_img = np.array(pil_img)
    #     img = get_filtered_image(cv_img, self.action)

    #     convert back to pil image
    #     im_pil = _pilImage.fromarray(img)

    #     save
    #     buffer = BytesIO()
    #     im_pil.save(buffer, format='png')
    #     image_png = buffer.getvalue()

    #     self.image.save(str(self.image), ContentFile(image_png), save=False)

    #     super().save(*args, **kwargs)

