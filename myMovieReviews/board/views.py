from django.shortcuts import render,redirect,get_object_or_404
from .models import Board

# Create your views here.
def review_create(request):
    if request.method == 'POST':
        # MovieReview 객체 생성
        Board.objects.create(
            title=request.POST['title'],
            year=request.POST['year'],
            genre=request.POST['genre'],
            star=request.POST['star'],
            runningtime=request.POST['runningtime'],
            director=request.POST['director'],
            actor=request.POST['actor'],
            review=request.POST['review'],
            image=request.FILES.get('image')  # 이미지 처리
        )
        # 생성 후 상세 페이지로 리다이렉트
        return redirect('board:home')  # Redirect to home after creation      
    # GET 요청 시 입력 폼 렌더링
    return render(request, 'board/edit.html')


def home(request):
    movies = Board.objects.all()  # 모든 영화 데이터 가져오기
    context={
        'movies':movies
    }
    return render(request, 'board/list.html', context)

def board_detail(request,pk):
    movie=Board.objects.get(id=pk)
    context={
        'movie':movie,
        
    }
    return render(request,'board/detail.html',context)


def board_update(request, pk):
    movie = get_object_or_404(Board, id=pk)  # Ensure the movie exists
    if request.method == "POST":
        # Update fields with POST data
        movie.title = request.POST.get('title', movie.title)
        movie.year = request.POST.get('year', movie.year)
        movie.genre = request.POST.get('genre', movie.genre)
        movie.star = request.POST.get('star', movie.star)
        movie.runningtime = request.POST.get('runningtime', movie.runningtime)
        movie.director = request.POST.get('director', movie.director)
        movie.actor = request.POST.get('actor', movie.actor)
        movie.review = request.POST.get('review', movie.review)

        # 이미지 처리
        if request.FILES.get('image'):
            movie.image = request.FILES.get('image')

        # Save the updated object
        movie.save()
        return redirect('board:board_detail', pk=movie.pk)  # Redirect to the detail page

    context = {
        'movie': movie,
    }
    return render(request, 'board/edit.html', context)



def board_delete(request,pk):
    if request.method=="POST":
        board=Board.objects.get(id=pk)
        board.delete()
        return redirect('board:home')
    return redirect('board:board_detail')