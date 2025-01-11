from django.contrib import admin


from .models import Board # 👈 models.py에서 Notice를 가져옴  
# Register your models here.
admin.site.register(Board) # 👈 Notice 클래스를 admin에 등록