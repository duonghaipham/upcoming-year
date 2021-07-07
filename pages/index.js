import Head from 'next/head'
import Image from 'next/image'
import lanterns from 'public/img/lanterns.jpg'
import styles from 'styles/home.module.scss'

const Home = () => {
  return (
    <div className={styles.home_page}>
      <Head>
        <title>Upcoming year</title>
        <link rel="icon" href="img/favicon.ico" />
      </Head>

      <main className={styles.content}>
        <div className={styles.relative}>
          <Image
            src={lanterns}
            alt="Cover"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            className={styles.image}
          />
          <p className={styles.welcome}>
            Xuân Nhâm Dần
          </p>
          <div className={styles.countdown}>
            <h3 className={styles.cd_title}>Đếm ngược nào</h3>
            <div className={styles.cd_content}>
              <div className={styles.day}>
                <p className={styles.cd_label}>Ngày</p>
                <div className={styles.cd_box}>
                  208
                </div>
              </div>
              <div className={styles.hour}>
                <p className={styles.cd_label}>Giờ</p>
                <div className={styles.cd_box}>
                  1
                </div>
              </div>
              <div className={styles.minute}>
                <p className={styles.cd_label}>Phút</p>
                <div className={styles.cd_box}>
                  57
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home;