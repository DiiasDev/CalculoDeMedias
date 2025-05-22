import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

export default function Navigation() {
  const location = useLocation();
  
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navItems}>
        <Link
          to="/"
          className={`${styles.navButton} ${location.pathname === "/" ? styles.active : ""}`}
        >
          Home
        </Link>
        <Link
          to="/calculo-media"
          className={`${styles.navButton} ${location.pathname === "/calculo-media" ? styles.active : ""}`}
        >
          Calculo de média
        </Link>
        <Link
          to="/tabela-media"
          className={`${styles.navButton} ${location.pathname === "/tabela-media" ? styles.active : ""}`}
        >
          Tabela de médias
        </Link>
      </nav>
    </div>
  );
}