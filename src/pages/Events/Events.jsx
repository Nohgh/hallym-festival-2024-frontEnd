import React, { useState } from "react";
import { Background, Header } from "../../components/index.js";
import { EventsModal } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import "./Events.scss";

const Events = () => {
  const [bingoBoard, setBingoBoard] = useState(Array(9).fill(null));
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [questionData, setQuestionData] = useState({
    question: "",
    answer: "",
  });
  const navigate = useNavigate();
  const QuestionList = [
    {
      question: "2 + 2는?",
      answer: "4",
    },
    {
      question: "1 + 2는?",
      answer: "3",
    },
    {
      question: "3 + 2는?",
      answer: "5",
    },
    {
      question: "4 + 2는?",
      answer: "6",
    },
    {
      question: "8 + 2는?",
      answer: "10",
    },
    {
      question: "1 + 10는?",
      answer: "11",
    },
    {
      question: "5 + 2는?",
      answer: "7",
    },
    {
      question: "0 + 0는?",
      answer: "0",
    },
    {
      question: "7 + 9는?",
      answer: "16",
    },
  ];
  const checkMultipleBingo = (board, index) => {
    let bingoCount = 0;
    // 행 확인
    const rowIndex = Math.floor(index / 3);
    let rowFilledCount = 0;
    for (let i = rowIndex * 3; i < (rowIndex + 1) * 3; i++) {
      if (board[i] === "O") {
        rowFilledCount++;
      }
    }
    if (rowFilledCount >= 2) {
      bingoCount++;
    }

    // 열 확인
    const colIndex = index % 3;
    let colFilledCount = 0;
    for (let i = colIndex; i < board.length; i += 3) {
      if (board[i] === "O") {
        colFilledCount++;
      }
    }
    if (colFilledCount >= 2) {
      bingoCount++;
    }

    // 주 대각선 확인
    let mainDiagonalFilledCount = 0;
    for (let i = 0; i < board.length; i += 4) {
      if (board[i] === "O") {
        mainDiagonalFilledCount++;
      }
    }
    if (mainDiagonalFilledCount >= 2) {
      bingoCount++;
    }

    // 부 대각선 확인
    let subDiagonalFilledCount = 0;
    for (let i = 2; i < board.length - 1; i += 2) {
      if (board[i] === "O") {
        subDiagonalFilledCount++;
      }
    }
    if (subDiagonalFilledCount >= 2) {
      bingoCount++;
    }

    return bingoCount;
  };

  const handleCellClick = (index) => {
    setCurrentIndex(index);
    setQuestionData(QuestionList[index]);
    setModalVisible(true);
  };

  const handleSubmitAnswer = (userAnswer) => {
    // 상태에 설정된 답안과 사용자 입력을 비교하여 정답 여부를 판단합니다.
    const isCorrect = userAnswer === questionData.answer;
    const updatedBingoBoard = bingoBoard.map((cell, i) =>
      i === currentIndex ? (isCorrect ? "O" : "X") : cell
    );

    setModalVisible(false);
    setBingoBoard(updatedBingoBoard);
    // 정답인 경우에는 해당 셀에 ".O" 클래스 추가
    if (isCorrect) {
      document
        .querySelector(`.bingo-cell:nth-child(${currentIndex + 1})`)
        .classList.add("O");
    } else {
      // 오답인 경우에는 해당 셀에 ".X" 클래스 추가
      document
        .querySelector(`.bingo-cell:nth-child(${currentIndex + 1})`)
        .classList.add("X");
    }
    const countBingo = checkMultipleBingo(bingoBoard, currentIndex);
    if (countBingo >= 2) {
      alert("빙고 2개 달성되었습니다!");
      handleGotoBack();
    }
  };
  const handleGotoBack = () => {
    navigate("/home");
  };

  return (
    <div className="events">
      <Background />
      <Header headcenter="이벤트" />
      <div className="events-container">
        <div className="events-container-wrapper">
          <div className="bingo-board">
            {bingoBoard.map((cell, index) => (
              <div
                key={index}
                className="bingo-cell"
                onClick={() => handleCellClick(index)}
              >
                {cell || index + 1}
              </div>
            ))}
          </div>
          {modalVisible && (
            <EventsModal
              question={questionData.question}
              onSubmit={handleSubmitAnswer}
              onClose={() => setModalVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
