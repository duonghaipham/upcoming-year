import styles from 'styles/in-quiz.module.scss'

const InQuiz = () => {
  return (
    <div className={styles.in_quiz}>
      <div className={styles.quiz_meta}>
        <h3 className={styles.name}>Phạm Hải Dương</h3>
        <hr className={styles.hr} />
        <div className={styles.detail}>
          <div className={styles.score}>
            <div className={styles.label}>Điểm:</div>
            <div className={styles.value}>10</div>
          </div>
          <div className={styles.remained_time}>
            <div className={styles.label}>Thời gian:</div>
            <div className={styles.value}>1s</div>
          </div>
        </div>
      </div>
      <div className={styles.quiz_main}>
        <div className={styles.question_container}>
          <div className={styles.question_ornament} />
          <p className={styles.question_content}>Lang Liêu là con của Vua Hùng thứ mấy?</p>
        </div>
        <ol className={styles.options}>
          <li className={styles.each_option}>Vua Hùng thứ 1</li>
          <li className={styles.each_option}>Vua Hùng thứ 6</li>
          <li className={styles.each_option}>Vua Hùng thứ 7</li>
          <li className={styles.each_option}>Vua Hùng thứ 18</li>
        </ol>
      </div>
    </div>
  )
}

export default InQuiz;