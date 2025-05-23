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
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroSerie, setFiltroSerie] = useState("Todos");

  const getDados = () => {
    const alunosData = JSON.parse(localStorage.getItem("alunos") || "[]");
    setAlunos(alunosData);
  };

  useEffect(() => {
    console.log("Montei o componente");
    getDados();
  }, []);

  const alunosFiltrados = alunos.filter((aluno) => {
    if (filtroStatus !== "Todos" && aluno.status !== filtroStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tabela de Alunos</h3>

      <div className={styles.filterGroup}>
        <div className={styles.filterContainer}>
          <select
            name="filtro-status"
            id="filtro-status"
            className={styles.filter}
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Reprovado">Reprovado</option>
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
            {alunosFiltrados.length > 0 ? (
              alunosFiltrados.map((aluno, index) => (
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
                  <td>
                    {aluno.nome} {aluno.sobrenome}
                  </td>
                  <td>{aluno.serie}</td>
                  <td>{aluno.media}</td>
                  <td>{aluno.ra}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Nenhum aluno encontrado com os filtros selecionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
