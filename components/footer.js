import Link from 'next/link'
import styles from 'styles/footer.module.scss'

const Footer = () => {
  const date = new Date();
  return (
    <footer className={styles.footer}>
      <p className={styles.develop}>Phát triển bởi Tyler &#169; {date.getFullYear()}</p>
      <Link href='#'>
        <a target='_blank' className={styles.link}>Tham chiếu</a>
      </Link>
    </footer>
  )
}

export default Footer;