import { useState, useEffect } from "react";
import styles from "./Alert.module.css";

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  autoClose?: number; // time in ms
}

const Alert = ({ message, type, onClose, autoClose = 3000 }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation before calling onClose
      }, autoClose);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade out animation
  };

  return (
    <div className={`${styles.alertOverlay} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={`${styles.alert} ${styles[type]}`}>
        <div className={styles.alertContent}>
          <span className={styles.message}>{message}</span>
        </div>
        <button className={styles.closeButton} onClick={handleClose}>
          <span>×</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
