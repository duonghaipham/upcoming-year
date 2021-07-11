import styles from 'styles/progress-bar.module.scss'
import {useEffect, useRef, useState} from "react";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);

  let interval = useRef();
  const startProgress = () => {
    interval = setInterval(() => {
      if (percentage === 100)
        clearInterval(interval.current);
      else
        setPercentage(percentage + 1);
    }, 20);
  }

  useEffect(() => {
    startProgress();
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.progress}>
      <div className={styles.bar} style={{width: percentage + '%'}} />
      <span className={styles.value}>{percentage}%</span>
    </div>
  )
}

export default ProgressBar;