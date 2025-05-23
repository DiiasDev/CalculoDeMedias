import styles from "./styles.module.css";
import { useState } from "react";
import Alert from "../Alert/Alert";

export default function Form() {
  const [step, setStep] = useState(1);
  const [aluno, setAluno] = useState({
    ra: "",
    nome: "",
    sobrenome: "",
    serie: "",
    notas: ["", "", "", ""],
    media: "",
  });
  const [resultadoExibido, setResultadoExibido] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; message: string; type: "success" | "error" | "warning" | "info" }>({
    show: false,
    message: "",
    type: "info"
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setAluno((prevAluno) => ({
      ...prevAluno,
      [name]: value,
    }));
  };

  const handleNotaChange = (index: number, value: string) => {
    setAluno((prevAluno) => {
      const notas = [...prevAluno.notas];
      notas[index] = value;
      return { ...prevAluno, notas };
    });
  };

  const calcularMedia = (notas: string[]) => {
    const notasNumericas = notas.map((nota) => parseFloat(nota));

    const soma = notasNumericas.reduce((acc, value) => acc + value);

    const media = soma / 4;

    return media;
  };

  const handleNextStep = (event: React.FormEvent) => {
    event.preventDefault();
    setStep(2);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const mediaCalculada = calcularMedia(aluno.notas);

    setAluno((prevAluno: any) => ({
      ...prevAluno,
      media: mediaCalculada,
    }));

    const alunoAtualizado = {
      ...aluno,
      media: mediaCalculada,
    };

    let alunosSaved = JSON.parse(localStorage.getItem("alunos") || "[]");

    const alreadyExists = alunosSaved.some(
      (e: { ra: string }) => e.ra === alunoAtualizado.ra
    );

    if (alreadyExists) {
      setAlert({
        show: true,
        message: "Aluno já cadastrado",
        type: "error"
      });
      return setResultadoExibido(false);
    }
    alunosSaved.push(alunoAtualizado);

    localStorage.setItem("alunos", JSON.stringify(alunosSaved));
    
    setAlert({
      show: true,
      message: "Aluno cadastrado com sucesso",
      type: "success"
    });
    setResultadoExibido(true);
  };

  return (
    <div className={styles.formContainer}>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step === 1 ? styles.active : ""}`}>
          1
        </div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
          2
        </div>
      </div>

      <div className={styles.formContent}>
        {step === 1 && (
          <>
            <h2 className={styles.formTitle}>Informações do Aluno</h2>
            <form onSubmit={handleNextStep}>
              <div className={styles.formGroup}>
                <label htmlFor="ra">Digite o RA do aluno</label>
                <input
                  name="ra"
                  value={aluno.ra}
                  onChange={handleInputChange}
                  type="text"
                  id="ra"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Digite o nome do aluno</label>
                <input
                  name="nome"
                  value={aluno.nome}
                  onChange={handleInputChange}
                  type="text"
                  id="nome"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="sobrenome">Digite o sobrenome do aluno</label>
                <input
                  name="sobrenome"
                  value={aluno.sobrenome}
                  onChange={handleInputChange}
                  type="text"
                  id="sobrenome"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="serie">Digite a série do aluno</label>
                <input
                  name="serie"
                  value={aluno.serie}
                  onChange={handleInputChange}
                  type="text"
                  id="serie"
                  required
                />
              </div>
              <div className={styles.formActions}>
                <div></div>
                <button
                  type="submit"
                  className={styles.nextButton}
                >
                  Próximo
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className={styles.formTitle}>Notas do Aluno</h2>
            <form onSubmit={handleSubmit}>
              {[0, 1, 2, 3].map((i) => (
                <div className={styles.formGroup} key={i}>
                  <label htmlFor={`nota${i + 1}`}>Digite a {i + 1}ª nota</label>
                  <input
                    value={aluno.notas[i]}
                    onChange={(e) => handleNotaChange(i, e.target.value)}
                    type="text"
                    id={`nota${i + 1}`}
                    required
                  />
                </div>
              ))}
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setStep(1)}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className={styles.nextButton}
                >
                  Calcular
                </button>
              </div>

              {resultadoExibido && (
                <div className={styles.resultado}>
                  <h3>Resultado</h3>
                  <p>
                    Média do aluno {aluno.nome} {aluno.sobrenome}:{" "}
                    <strong>{aluno.media}</strong>
                  </p>
                  {Number(aluno.media) >= 6 ? (
                    <p className={styles.aprovado}>Situação: Aprovado</p>
                  ) : (
                    <p className={styles.reprovado}>Situação: Reprovado</p>
                  )}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
