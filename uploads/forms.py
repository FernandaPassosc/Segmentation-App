from django import forms
from django.forms import fields
from django.forms.models import ModelForm
from .models import Image

class ImageForm(forms.ModelForm):

    class Meta: 
        model = Image
        fields = ('image',)

    
