import styles from "./styles.module.css";
import { useState } from "react";

type TableProps = {
  headers?: string[];
  data?: string[][];
};

export default function Table(props: TableProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tabela de Alunos</h3>

      <div className={styles.filterContainer}>
        <select name="filtro" id="filtro" className={styles.filter}>
            <option value="Aprovado">Aprovado</option>
            <option value="Reprovado">Reprovado</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Aluno</th>
              <th>Série</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={`${styles.statusContainer} ${styles.aprovado}`}>
                  Aprovado
                </div>
              </td>
              <td>João Silva</td>
              <td>9º ano</td>
              <td>8.5</td>
            </tr>
            <tr>
              <td>
                <div className={`${styles.statusContainer} ${styles.reprovado}`}>
                  Reprovado
                </div>
              </td>
              <td>Maria Santos</td>
              <td>8º ano</td>
              <td>5.5</td>
            </tr>
            <tr>
              <td>
                <div className={`${styles.statusContainer} ${styles.aprovado}`}>
                  Aprovado
                </div>
              </td>
              <td>Pedro Souza</td>
              <td>7º ano</td>
              <td>7.8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
