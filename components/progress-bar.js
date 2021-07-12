import styles from 'styles/progress-bar.module.scss'
import {useEffect, useRef, useState} from "react";

const ProgressBar = (props) => {
  const [percentage, setPercentage] = useState(0);

  let interval = useRef();
  const startProgress = () => {
    interval = setInterval(() => {
      if (percentage === 100) {
        clearInterval(interval.current);
        props.setStateGame('in-quiz');
      }
      else
        setPercentage(percentage + 1);
    }, 15);
  };

  useEffect(() => {
    startProgress();
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.progress_bar}>
      <h2 className={styles.progress_title}>Đang tải...</h2>
      <div className={styles.progress}>
        <div className={styles.processed} style={{width: percentage + '%'}} />
        <span className={styles.value}>{percentage}%</span>
      </div>
    </div>
  )
}

export default ProgressBar;