import Link from 'next/link'
import Image from 'next/image'
import styles from 'styles/quiz-instruct.module.scss'
import lantern from 'public/svg/lantern.svg'

const QuizInstruct = (props) => {
  return (
    <div className={styles.instr_container}>
      <div className={styles.main_instruct}>
        <h1 className={styles.instr_title}>Hướng dẫn: Đố vui, đố cộc</h1>
        <hr className={styles.hr} />
        <ul className={styles.instr_content}>
          <li className={styles.instr_idea}>Mini-game có 5 câu hỏi, mỗi câu có 30 giây để suy nghĩ và trả lời (trắc nghiệm).</li>
          <li className={styles.instr_idea}>Trả lời sai: +0 điểm.</li>
          <li className={styles.instr_idea}>Trả lời đúng: số thời gian còn lại của câu đó càng nhiều thì số điểm càng nhiều.</li>
          <li className={styles.instr_idea}>Nhắc nhở: coi chừng bị gài nhe hehe.</li>
        </ul>
      </div>
      <div className={styles.functions_quiz}>
        <Link href="/">
          <a className={styles.cancel_quiz}><i className='fa'>&#xf01e;</i> Trở lại</a>
        </Link>
        <button className={styles.start_quiz} onClick={() => props.onUserClick('progress-bar')}><i className='fa'>&#xf1d9;</i> Bắt đầu</button>
      </div>
    </div>
  )
}

export default QuizInstruct;