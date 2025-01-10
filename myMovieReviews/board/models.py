from django.db import models

class Board(models.Model):
    # 영화 제목
    title = models.CharField(max_length=100) 
    # 개봉년도
    year = models.IntegerField()
    # 영화 장르
    genre = models.CharField(max_length=50)
    # 관람등급
    star = models.CharField(max_length=50)
    # 러닝타임
    runningtime = models.PositiveIntegerField()  # 분 단위
    # 감독
    director = models.CharField(max_length=100)
    # 배우
    actor = models.TextField()  # 주요 배우를 콤마로 구분해 저장
    # 리뷰 내용
    review = models.TextField()
    # 작성일
    created_at = models.DateTimeField(auto_now_add=True)
    # 수정일
    updated_at = models.DateTimeField(auto_now=True)

    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.title
