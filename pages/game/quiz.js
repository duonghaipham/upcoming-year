import {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import QuizInstruct from 'components/quiz-instruct'
import InQuiz from 'components/in-quiz'
import ProgressBar from 'components/progress-bar'
import styles from 'styles/quiz.module.scss'
import lantern from 'public/svg/lantern.svg';
import food from 'public/svg/food.svg';

const Quiz = () => {
  const [status, setStatus] = useState("instruction");

  const stateGame = (which) => {
    setStatus(which);
  }

  let process;
  if (status === 'instruction')
    process = <QuizInstruct setStateGame={stateGame} />;
  else if (status === 'progress-bar')
    process = <ProgressBar setStateGame={stateGame} />
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
}

export default Quiz;