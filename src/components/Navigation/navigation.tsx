import styles from "./styles.module.css";

export default function Navigation() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navItems}>
        <button className={styles.navButton}>Home</button>
        <button className={styles.navButton}>Calculo de média</button>
        <button className={styles.navButton}>Tabela de médias</button>
      </nav>
    </div>
  );
}
