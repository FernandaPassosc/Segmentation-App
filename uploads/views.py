
from uploads.models import Image
from django.http.response import JsonResponse
from django.shortcuts import render
from .forms import ImageForm
from django.http import HttpResponse
import json
from django.core import serializers
from django.shortcuts import render


from tkinter import Tk, Canvas, Frame, BOTH


def image_upload_view(request):
    form = ImageForm(request.POST or None, request.FILES or None )

    if request.is_ajax():
        pic_id = json.loads(request.POST.get('id'))
        action = request.POST.get('action')

        if pic_id is None:
            if form.is_valid():
                obj = form.save(commit=False)
        else:
            obj = Image.objects.get(id=pic_id)
        
        obj.action = action
        obj.save()
        data = serializers.serialize('json', [obj])
        
        return JsonResponse({'data': data})

    context = {
        'form': form,
    }
    return render(request, 'uploads/index.html', context)




def about(request):
    return render(request, 'uploads/about.html')
