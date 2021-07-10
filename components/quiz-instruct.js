import Link from 'next/link'
import styles from 'styles/quiz-instruct.module.scss'

const QuizInstruct = () => {
  return (
    <div className={styles.quiz_instruct}>
      <div className={styles.inst_container}>
        <div className={styles.main_instruct}>
          <h1 className={styles.inst_title}>Hướng dẫn</h1>
          <p className={styles.inst_content}>Nội dung ở đây</p>
        </div>
        <Link href="/">
          <a className={styles.cancel_quiz}>Trở lại</a>
        </Link>
        <button className={styles.start_quiz}>Bắt đầu</button>
      </div>
    </div>
  )
}

export default QuizInstruct;