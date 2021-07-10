import Head from 'next/head'
import QuizInstruct from "components/quiz-instruct";

const Quiz = () => {
  return (
    <div>
      <Head>
        <title>Đố vui</title>
        <link rel="icon" href="img/favicon.ico" />
      </Head>

      <main>
        <QuizInstruct />
      </main>
    </div>
  )
}

export default Quiz;