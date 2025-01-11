from django.urls import path
from .views import *

app_name = 'board'

urlpatterns = [
    path('', home, name='home'),
    path('create',review_create, name='review_create'),
    path('detail/<int:pk>',board_detail,name='board_detail'),
    path('update/<int:pk>',board_update ,name='board_update'),
    path('delete/<int:pk>',board_delete ,name='board_delete'),

]