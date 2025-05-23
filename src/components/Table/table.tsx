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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const getDados = () => {
    const alunosData = JSON.parse(localStorage.getItem("alunos") || "[]");
    setAlunos(alunosData);
  };

  useEffect(() => {
    console.log("Montei o componente");
    getDados();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const alunosFiltrados = alunos.filter((aluno) => {
    if (filtroStatus !== "Todos" && aluno.status !== filtroStatus) {
      return false;
    }
    return true;
  });

  const excluirAluno = (ra: number) => {
    const alunosData = JSON.parse(localStorage.getItem("alunos") || "[]");

    const novoArrayAlunos = alunosData.filter(
      (aluno: Aluno) => aluno.ra !== ra
    );

    localStorage.setItem("alunos", JSON.stringify(novoArrayAlunos));

    setAlunos(novoArrayAlunos);
  };

  const renderMobileCards = () => {
    if (alunosFiltrados.length === 0) {
      return (
        <div className={styles.mobileCard}>
          <p style={{ textAlign: "center" }}>
            Nenhum aluno encontrado com os filtros selecionados
          </p>
        </div>
      );
    }

    return alunosFiltrados.map((aluno, index) => (
      <div
        key={index}
        className={`${styles.mobileCard} ${
          aluno.status === "Aprovado" ? styles.aprovado : styles.reprovado
        }`}
      >
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>Status:</span>
          <span className={styles.mobileCardValue}>
            <div
              className={`${styles.statusContainer} ${
                aluno.status === "Aprovado" ? styles.aprovado : styles.reprovado
              }`}
            >
              {aluno.status}
            </div>
          </span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>Aluno:</span>
          <span className={styles.mobileCardValue}>
            {aluno.nome} {aluno.sobrenome}
          </span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>Série:</span>
          <span className={styles.mobileCardValue}>{aluno.serie}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>Média:</span>
          <span className={styles.mobileCardValue}>{aluno.media}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>RA:</span>
          <span className={styles.mobileCardValue}>{aluno.ra}</span>
        </div>
        <div className={styles.mobileCardRow} style={{ justifyContent: 'center' }}>
          <button 
            onClick={() => excluirAluno(aluno.ra)} 
            style={{ cursor: "pointer", color: "red", border: "none", background: "none", padding: "5px" }}
          >
            Excluir
          </button>
        </div>
      </div>
    ));
  };

  const renderTable = () => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.cabecalho}>Status</th>
          <th className={styles.cabecalho}>Aluno</th>
          <th className={styles.cabecalho}>Série</th>
          <th className={styles.cabecalho}>Média</th>
          <th className={styles.cabecalho}>RA</th>
          <th className={styles.cabecalho}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {alunosFiltrados.length > 0 ? (
          alunosFiltrados.map((aluno, index) => (
            <tr key={index}>
              <td data-label="Status">
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
              <td data-label="Aluno">
                {aluno.nome} {aluno.sobrenome}
              </td>
              <td data-label="Série">{aluno.serie}</td>
              <td data-label="Média">{aluno.media}</td>
              <td data-label="RA">{aluno.ra}</td>
              <td
                data-label="Excluir"
                onClick={() => excluirAluno(aluno.ra)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Excluir
              </td>
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
  );

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
        {isMobile ? renderMobileCards() : renderTable()}
      </div>
    </div>
  );
}

