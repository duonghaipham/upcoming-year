import Link from 'next/link'
import styles from 'styles/instruction.module.scss'

const Instruction = (props) => {
  return (
    <div className={styles.instr_container}>
      <div className={styles.main_instruct}>
        <h1 className={styles.instr_title}>Hướng dẫn: {props.content.title}</h1>
        <ul className={styles.instr_content}>
          {props.content.rules.map((idea) => <li className={styles.instr_idea}>{idea}</li>)}
        </ul>
      </div>
      <div className={styles.functions}>
        <Link href='/'>
          <a className={styles.cancel}><i className='fa'>&#xf01e;</i> Trở lại</a>
        </Link>
        <button className={styles.start} onClick={() => props.setStateGame(props.progressBar)}><i className='fa'>&#xf1d9;</i> Bắt đầu</button>
      </div>
    </div>
  )
}

export default Instruction;