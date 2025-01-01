let attempts = 9; // 시도 가능 횟수
let randomNumbers = []; // 정답 숫자 배열

// 게임 초기화 함수
function initializeGame() {
  // 시도 가능 횟수 설정
  attempts = 9;
  document.getElementById("attempts").textContent = attempts;

  // 중복되지 않는 3개의 랜덤 숫자 생성
  randomNumbers = generateRandomNumbers();
  console.log("생성된 랜덤 숫자:", randomNumbers); // 디버깅: 생성된 랜덤 숫자 확인

  // input과 결과창 초기화
  document.getElementById("number1").value = "";
  document.getElementById("number2").value = "";
  document.getElementById("number3").value = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("game-result-img").src = "";

  // 버튼 활성화
  document.querySelector(".submit-button").disabled = false;
}

// 중복되지 않는 3개의 랜덤 숫자를 생성하는 함수
function generateRandomNumbers() {
  const numbers = new Set();
  while (numbers.size < 3) {
    const random = Math.floor(Math.random() * 10);
    console.log("생성된 숫자:", random); // 디버깅: 각 숫자 확인
    numbers.add(random);
  }
  return Array.from(numbers);
}

// 숫자 확인 함수
function check_numbers() {
  const input1 = document.getElementById("number1").value;
  const input2 = document.getElementById("number2").value;
  const input3 = document.getElementById("number3").value;

  // 입력이 비어 있는 경우
  if (input1 === "" || input2 === "" || input3 === "") {
    alert("모든 칸에 숫자를 입력하세요!");
    return;
  }

  // 입력 숫자를 배열로 변환
  const userNumbers = [parseInt(input1), parseInt(input2), parseInt(input3)];
  const userNumberAsThreeDigit = userNumbers.join(""); // 세 자리 숫자로 변환

  // 결과 계산
  const result = calculateResult(userNumbers);

  // 결과 출력
  const resultsSpan = document.getElementById("results");

  // 입력한 세 자리 숫자를 출력
  const numberElement = document.createElement("span");
  numberElement.textContent = `${userNumberAsThreeDigit}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`;
  resultsSpan.appendChild(numberElement);

  // 결과를 출력
  const resultElement = document.createElement("span");
  resultElement.textContent = `${result}`;
  resultsSpan.appendChild(resultElement);

  resultsSpan.appendChild(document.createElement("br"));
  // 시도 횟수 감소
  attempts--;
  document.getElementById("attempts").textContent = attempts;

  // 게임 종료 조건 확인
  if (result === "👌3S ⚾0B") {
    endGame(true);
  } else if (attempts === 0) {
    endGame(false);
  }

  // 입력 초기화
  document.getElementById("number1").value = "";
  document.getElementById("number2").value = "";
  document.getElementById("number3").value = "";
  document.getElementById("number1").focus();
}

// 결과 계산 함수
function calculateResult(userNumbers) {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < 3; i++) {
    if (userNumbers[i] === randomNumbers[i]) {
      strikes++;
    } else if (randomNumbers.includes(userNumbers[i])) {
      balls++;
    }
  }

  return `👌${strikes}S ⚾${balls}B`;
}

// 게임 종료 함수
function endGame(isWin) {
  const resultImg = document.getElementById("game-result-img");

  if (isWin) {
    resultImg.src = "success.png";
    alert("축하합니다! 모든 숫자를 맞췄습니다.");
  } else {
    resultImg.src = "fail.png";
    alert(`게임 오버! 정답은 ${randomNumbers.join("")}입니다.`);
  }

  // 버튼 비활성화
  document.querySelector(".submit-button").disabled = true;
}

// 초기화 실행
initializeGame();
