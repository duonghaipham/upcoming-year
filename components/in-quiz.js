import styles from 'styles/in-quiz.module.scss'
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

const InQuiz = () => {
  const questions = [
    {
      questionText: "Lang Liêu là con của Vua Hùng thứ mấy?",
      answerOptions: [
        { answerText: "Vua Hùng thứ 6", isCorrect: true },
        { answerText: "Vua Hùng thứ 7", isCorrect: false },
        { answerText: "Vua Hùng thứ 8", isCorrect: false },
        { answerText: "Vua Hùng thứ 9", isCorrect: false }
      ]
    },
    {
      questionText: "Tháng Chạp năm Tân Sửu 2021 có bao nhiêu ngày?",
      answerOptions: [
        { answerText: "28 ngày", isCorrect: false },
        { answerText: "29 ngày", isCorrect: true },
        { answerText: "30 ngày", isCorrect: false },
        { answerText: "31 ngày", isCorrect: false }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [remainedTime, setRemainedTime] = useState(30);
  const [score, setScore] = useState(0);
  const [numCorrects, setNumCorrects] = useState(0);
  const [conclusion, setConclusion] = useState(false);

  let interval = useRef();
  const startTimeDown = () => {
    interval = setInterval(() => {
      if (remainedTime === 0)
        handleAnswerClick(false);
      else
        setRemainedTime(remainedTime - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimeDown();
    return () => clearInterval(interval);
  });

  const handleAnswerClick = (isCorrect) => {
    clearInterval(interval);
    if (isCorrect === true) {
      setScore(parseFloat((score + 0.3 * remainedTime).toFixed(2)));
      setNumCorrects(numCorrects + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setRemainedTime(30);
    }
    else
      setConclusion(true);
  }

  return (conclusion === false) ?
    <div className={styles.in_quiz}>
      <div className={styles.quiz_meta}>
        <h3 className={styles.name}>Phạm Hải Dương</h3>
        <hr className={styles.hr}/>
        <div className={styles.detail}>
          <div className={styles.score}>
            <div className={styles.label}>Điểm:</div>
            <div className={styles.value}>{score}</div>
          </div>
          <div className={styles.remained_time}>
            <div className={styles.label}>Thời gian:</div>
            <div className={styles.value}>{remainedTime}s</div>
          </div>
        </div>
      </div>
      <div className={styles.quiz_main}>
        <div className={styles.question_container}>
          <div className={styles.question_ornament}/>
          <p className={styles.question_content}>{questions[currentQuestion].questionText}</p>
        </div>
        <ol className={styles.options}>
          {questions[currentQuestion].answerOptions.map((answerOption) =>
            <li className={styles.each_option}
                onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</li>)}
        </ol>
      </div>
    </div>
    :
    <div className={styles.in_quiz}
         style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div className={styles.quiz_conclusion}>
        <h1 className={styles.conclusion_title}>Kết quả</h1>
        <hr className={styles.hr}/>
        <h3 className={styles.conclusion_name}>Phạm Hải Dương</h3>
        <div className={styles.conclusion_num_corrects}>
          <div className={styles.label}>Số câu đúng:</div>
          <div className={styles.value}>{numCorrects}</div>
        </div>
        <div className={styles.conclusion_score}>
          <div className={styles.label}>Tổng điểm:</div>
          <div className={styles.value}>{score}</div>
        </div>
        <Link href="/">
          <a className={styles.go_back}>Về trang chủ</a>
        </Link>
      </div>
    </div>;
};

export default InQuiz;