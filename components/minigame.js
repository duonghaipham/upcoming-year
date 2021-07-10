import Link from 'next/link'
import styles from 'styles/minigame.module.scss'

const Minigame = () => {
  return (
    <div className={styles.game}>
      <h2 className={styles.game_title}><i className={`${styles.spin} fa`}>&#xf11b;</i> Tham gia trò chơi</h2>
      <ul className={styles.game_list}>
        <li className={styles.this_game}>
          <div className={`${styles.game_img} ${styles.wheel}`}>
            <div className={`${styles.game_ornament} ${styles.god_of_wealth}`} />
          </div>
          <h4 className={styles.game_caption}>Vòng quay nhân phẩm</h4>
          <p className={styles.game_description}>Chỉ cần quay 1 phát đã có ngay lì xì</p>
          <Link href='/game/wheel'>
            <a><button className={styles.game_join}>Tham gia</button></a>
          </Link>
        </li>
        <li className={styles.this_game}>
          <div className={`${styles.game_img} ${styles.quiz}`}>
            <div className={`${styles.game_ornament} ${styles.girl_1}`} />
          </div>
          <figcaption className={styles.game_caption}>Đố vui</figcaption>
          <p className={styles.game_description}>Kiến thức càng rộng, lì xì càng nhiều</p>
          <Link href='/game/quiz'>
            <a><button className={styles.game_join}>Tham gia</button></a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Minigame;