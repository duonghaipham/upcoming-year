import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import lanterns from "../public/img/lanterns.jpg";
import styles from "../styles/countdown.module.scss";

const Countdown = () => {
  const [timerDays, setTimerDays] = useState(null);
  const [timerHours, setTimerHours] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(null);

  let interval = useRef();
  const startTimer = () => {
    const countdownDate = new Date('Feb 1, 2022 00:00:00').getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60) / 1000);

      if (distance < 0)
        clearInterval(interval.current);
      else {
        setTimerDays(days);
        setTimerMinutes(minutes);
        setTimerHours(hours);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(interval);
  });

  return (
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
            <div className={styles.cd_group_box}>
              <div className={styles.cd_box}>{Math.floor(timerDays / 100)}</div>
              <div className={styles.cd_box}>{Math.floor((timerDays % 100) / 10)}</div>
              <div className={styles.cd_box}>{timerDays % 10}</div>
            </div>
          </div>
          <div className={styles.hour}>
            <p className={styles.cd_label}>Giờ</p>
            <div className={styles.cd_group_box}>
              <div className={styles.cd_box}>{Math.floor(timerHours / 10)}</div>
              <div className={styles.cd_box}>{timerHours % 10}</div>
            </div>
          </div>
          <div className={styles.minute}>
            <p className={styles.cd_label}>Phút</p>
            <div className={styles.cd_group_box}>
              <div className={styles.cd_box}>{Math.floor(timerMinutes / 10)}</div>
              <div className={styles.cd_box}>{timerMinutes % 10}</div>
            </div>
          </div>
          <div className={styles.second}>
            <p className={styles.cd_label}>Giây</p>
            <div className={styles.cd_group_box}>
              <div className={styles.cd_box}>{Math.floor(timerSeconds / 10)}</div>
              <div className={styles.cd_box}>{timerSeconds % 10}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countdown;