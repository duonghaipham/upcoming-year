import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import styles from 'styles/in-quiz.module.scss';

const InQuiz = () => {
  const QUIZ_IN_PROGRESS = 0;
  const QUIZ_END = 1;

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
  const [result, setResult] = useState([]);
  const [stateQuiz, setStateQuiz] = useState(QUIZ_IN_PROGRESS);

  const totalTime = useRef(0);
  const resultList = useRef();
  const correctAnswer = useRef();
  let interval = useRef();

  const startTimeDown = () => {
    interval = setInterval(() => {
      if (remainedTime === 0) {
        handleAnswerClick(false);
      }
      else
        setRemainedTime(remainedTime - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimeDown();
    return () => clearInterval(interval);
  });

  // handle to click on answer option
  const handleAnswerClick = (isCorrect) => {
    clearInterval(interval);
    if (isCorrect === true) {
      setScore(parseFloat((score + remainedTime / 3).toFixed(2)));
      result.push({ index: currentQuestion, isCorrect: true });
    }
    else
      result.push({ index: currentQuestion, isCorrect: false });
    setResult(result);

    if (correctAnswer.current !== null)
      correctAnswer.current.style.animation = 'blink-green 500ms infinite';
    totalTime.current += 30 - remainedTime;

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        correctAnswer.current.style.animation = 'none';
        setCurrentQuestion(nextQuestion);
        setRemainedTime(30);
      }, 1500);
    }
    else {
      setTimeout(() => {
        setStateQuiz(QUIZ_END);
      }, 1500);
    }
  }

  // handle to click on number corrects
  const handleViewResult = () => {
    if (resultList.current.style.display === 'block')
      resultList.current.style.display = 'none';
    else
      resultList.current.style.display = 'block';
  }

  return (stateQuiz === QUIZ_IN_PROGRESS) ?
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
          <p className={styles.question_content}>#{currentQuestion + 1} {questions[currentQuestion].questionText}</p>
        </div>
        <ol className={styles.options}>
          {questions[currentQuestion].answerOptions.map((answerOption) =>
            (answerOption.isCorrect === true) ?
              <li className={styles.each_option} ref={correctAnswer} onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</li> :
              <li className={styles.each_option} onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</li>
          )}
        </ol>
      </div>
    </div>
    :
    <div className={styles.in_quiz}
         style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className={styles.quiz_conclusion}>
        <h1 className={styles.conclusion_title}>Kết quả</h1>
        <hr className={styles.hr} />
        <h3 className={styles.conclusion_name}>Phạm Hải Dương</h3>
        <div className={styles.conclusion_total_time}>
          <div>Tổng thời gian:</div>
          <div>{totalTime.current}s</div>
        </div>
        <div className={styles.conclusion_num_corrects}>
          <div className={styles.num_corrects_total}>
            <div>Số câu đúng:</div>
            <div className={styles.value} onClick={handleViewResult}>{result.filter((current) => current.isCorrect === true).length}/{result.length}</div>
          </div>
          <ul className={styles.list_corrects} ref={resultList}>
            {result.map((current) => {
              let className, style;
              if (current.isCorrect === true) {
                className = 'fa fa-check';
                style = { color: '#04aa6d', marginLeft: '1rem' };
              }
              else {
                className = 'fa fa-close';
                style = { color: '#b50102', marginLeft: '1rem' };
              }
              return <li>Câu {current.index + 1}:<i className={className} style={style} /></li>
            })}
          </ul>
        </div>
        <hr className={styles.hr} />
        <div className={styles.conclusion_score}>{score}</div>
        <Link href='/'>
          <a className={styles.go_back}>Về trang chủ</a>
        </Link>
      </div>
    </div>
};

export default InQuiz;