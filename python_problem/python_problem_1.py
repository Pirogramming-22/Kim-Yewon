import random

def brGame():
    num = 0
    turn = "player" 

    while num < 31:
        print(f"현재 숫자: {num}")
        if turn == "player":
            while True:
                try:
                    count = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능): "))
                    if count not in [1, 2, 3]:
                        print("1, 2, 3 중 하나를 입력하세요.")
                    else:
                        break
                except ValueError:
                    print("정수를 입력하세요.")

            for i in range(1, count + 1):
                num += 1
                print(f"player {num}")
                if num == 31:
                    print("computer win!")
                    return

            turn = "computer"

        else: 
            count = random.randint(1, 3)
            print(f"computer가 {count}개의 숫자를 부릅니다.")

            for i in range(1, count + 1):
                num += 1
                print(f"computer {num}")
                if num == 31:
                    print("player win!")
                    return

            turn = "player"

brGame()