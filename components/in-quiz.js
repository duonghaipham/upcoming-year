import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import styles from 'styles/in-quiz.module.scss';

const InQuiz = () => {
  const QUIZ_IN_PROGRESS = 0;
  const QUIZ_END = 1;

  const comments = [
    [
      ["Xứng danh cao thủ", "Vừa nhanh vừa chính xác"],
      ["Chơi hay vậy ra chuồng gà chơi nhe", "Chơi vậy ai chơi lại"]
    ],
    [
      ["Làm nhanh như The Flash", "Kẻ hủy diệt câu hỏi..."],
      ["Ngon rồi!!!", "Siêu cấp vip pro quá"]
    ],
    [
      ["Không tồi!!!", "Chơi vui là chính, lì xì là mười"],
      ["Câu hỏi hơi khó hé?!", "Híc híc"],
    ],
    [
      ["Cố gắng thêm nữa nhe", "Quá nhanh, quá 'ẩu'"],
      ["Sao chơi 'hay' dữ vậy", "Cuộc sống mà..."]
    ]
  ];

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

  const [stateQuiz, setStateQuiz] = useState(QUIZ_IN_PROGRESS);        // determine whether in-progress or conclusion
  const [currentQuestion, setCurrentQuestion] = useState(0);  // the current question is being taken
  const [remainedTime, setRemainedTime] = useState(30);       // the remained time for the current question
  const [score, setScore] = useState(0);                      // accumulative sum up to now
  const [comment, setComment] = useState('');                 // the comment in the conclusion

  const result = useRef([]);     // the array of results (right or wrong)
  const totalTime = useRef(0);   // the total time which user take
  const correctAnswer = useRef();         // the correct answer for each question (for blink)
  let interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      if (remainedTime === 0)
        handleAnswerClick(false);
      else
        setRemainedTime(r => r - 1);
    }, 1000);
    return () => clearInterval(interval.current);
  }, [currentQuestion, questions.length, remainedTime]);

  useEffect(() => {
    const scoreToIndex = () => {
      const decScore = result.current.filter((value) => value.isCorrect).length / result.current.length;
      if (decScore >= 0.75)
        return 0;
      else if (decScore >= 0.5)
        return 1;
      else if (decScore >= 0.25)
        return 2;
      else
        return 3;
    }

    const timeToIndex = () => {
      const decTime = 1 - totalTime.current / (questions.length * 30);
      if (decTime >= 0.5)
        return 0;
      else
        return 1;
    }
    if (stateQuiz === QUIZ_END) {
      setComment(comments[scoreToIndex()][timeToIndex()][Math.floor(Math.random() * 2)]);
    }
  }, [comments, questions.length, score, stateQuiz]);

  // handle to click on answer option
  const handleAnswerClick = (isCorrect) => {
    clearInterval(interval.current);
    if (isCorrect) {
      setScore(s => parseFloat((s + remainedTime / 3).toFixed(2)));
      result.current.push({ index: currentQuestion, isCorrect: true });
    }
    else
      result.current.push({ index: currentQuestion, isCorrect: false });

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
            (answerOption.isCorrect) ?
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
            <div className={styles.value}>{result.current.filter((current) => current.isCorrect).length}/{result.current.length}</div>
          </div>
          <ul className={styles.list_corrects}>
            {result.current.map((current) => {
              let className, style;
              if (current.isCorrect) {
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
        <p className={styles.conclusion_comment}>{comment}</p>
        <Link href='/'><a className={styles.go_back}>Về trang chủ</a></Link>
      </div>
    </div>
};

export default InQuiz;