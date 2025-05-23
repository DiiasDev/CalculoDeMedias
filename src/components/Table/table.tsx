import styles from "./styles.module.css";
import { useState, useEffect } from "react";

type TableProps = {
  headers?: string[];
  data?: string[][];
};

type Aluno = {
  nome: string;
  sobrenome: string;
  serie: string;
  media: number;
  status: string;
  ra: number;
};

export default function Table(props: TableProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const getDados = () => {
    const alunosData = JSON.parse(localStorage.getItem("alunos") || "[]");
    setAlunos(alunosData);
  };

  useEffect(() => {
    console.log("Montei o componente");
    getDados();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tabela de Alunos</h3>

      <div className={styles.filterGroup}>
        <div className={styles.filterContainer}>
          <select
            name="filtro-status"
            id="filtro-status"
            className={styles.filter}
          >
            <option value="Aprovado">Aprovado</option>
            <option value="Reprovado">Reprovado</option>
          </select>
        </div>

        <div className={styles.filterContainer}>
          <select
            name="filtro-serie"
            id="filtro-serie"
            className={styles.filter}
          >
            <option value="1 ao 5">1° ao 5° Ano</option>
            <option value="6° ao 9° Ano">6° ao 9° Ano</option>
            <option value="1° ao 3° Ano médio">1° ao 3° Ano médio</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.cabecalho}>Status</th>
              <th className={styles.cabecalho}>Aluno</th>
              <th className={styles.cabecalho}>Série</th>
              <th className={styles.cabecalho}>Média</th>
              <th className={styles.cabecalho}>RA</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length > 0 ? (
              alunos.map((aluno, index) => (
                <tr key={index}>
                  <td>
                    <div
                      className={`${styles.statusContainer} ${
                        aluno.status === "Aprovado"
                          ? styles.aprovado
                          : styles.reprovado
                      }`}
                    >
                      {aluno.status}
                    </div>
                  </td>
                  <td>{aluno.nome} {aluno.sobrenome}</td>
                  <td>{aluno.serie}</td>
                  <td>{aluno.media}</td>
                  <td>{aluno.ra}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Nenhum aluno cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
