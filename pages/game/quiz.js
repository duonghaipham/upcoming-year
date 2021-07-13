import {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Instruction from 'components/instruction';
import InQuiz from 'components/in-quiz';
import ProgressBar from 'components/progress-bar';
import styles from 'styles/quiz.module.scss';
import lantern from 'public/svg/lantern.svg';
import food from 'public/svg/food.svg';

const Quiz = () => {
  const QUIZ_INSTRUCTION = 0;
  const QUIZ_PROGRESS_BAR = 1;
  const QUIZ_IN_PROGRESS = 2;

  const [status, setStatus] = useState(QUIZ_INSTRUCTION);

  const stateGame = (which) => {
    setStatus(which);
  }

  const content = {
    title: 'Đố vui, đố cộc',
    rules: [
      'Mini-game có 5 câu hỏi, mỗi câu có 30 giây để suy nghĩ và trả lời (trắc nghiệm).',
      'Trả lời sai: +0 điểm.',
      'Trả lời đúng: số thời gian còn lại của câu đó càng nhiều thì số điểm càng nhiều.',
      'Nhắc nhở: coi chừng bị gài nhe hehe.'
    ]
  };

  let process;
  if (status === QUIZ_INSTRUCTION)
    process = <Instruction setStateGame={stateGame} content={content} progressBar={QUIZ_PROGRESS_BAR} />;
  else if (status === QUIZ_PROGRESS_BAR)
    process = <ProgressBar setStateGame={stateGame} inProgress={QUIZ_IN_PROGRESS} />
  else
    process = <InQuiz />

  return (
    <div>
      <Head>
        <title>Đố vui</title>
        <link rel="icon" href="img/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>

      <main className={styles.quiz}>
        <div className={styles.quiz_decor}>
          <div className={styles.decor_lantern_left}>
            <Image src={lantern} alt='Chinese lantern left' />
          </div>
          <div className={styles.decor_lantern_right}>
            <Image src={lantern} alt='Chinese lantern right' />
          </div>
          <div className={styles.decor_food}>
            <Image src={food} alt='Food in Tet' />
          </div>
        </div>
        {process}
      </main>
    </div>
  )
};

export default Quiz;