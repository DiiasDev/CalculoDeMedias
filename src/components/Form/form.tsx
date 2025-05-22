import styles from "./styles.module.css";
import { useState } from "react";

export default function Form() {
  const [step, setStep] = useState(1);
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step === 1 ? styles.active : ''}`}>1</div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ''}`}>2</div>
      </div>
      
      <div className={styles.formContent}>
        {step == 1 && (
          <>
            <h2 className={styles.formTitle}>Informações do Aluno</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Digite o nome do aluno</label>
                <input type="text" id="nome" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="sobrenome">Digite o sobrenome do aluno</label>
                <input type="text" id="sobrenome" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="serie">Digite a série do aluno</label>
                <input type="text" id="serie" />
              </div>
              
              <div className={styles.formActions}>
                <div></div> {/* Spacer para alinhamento */}
                <button 
                  type="button" 
                  className={styles.nextButton}
                  onClick={() => setStep(2)}
                >
                  Próximo
                </button>
              </div>
            </form>
          </>
        )}

        {step == 2 && (
          <>
            <h2 className={styles.formTitle}>Notas do Aluno</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="nota1">Digite a primeira nota</label>
                <input type="text" id="nota1" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nota2">Digite a segunda nota</label>
                <input type="text" id="nota2" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nota3">Digite a terceira nota</label>
                <input type="text" id="nota3" />
              </div>
              
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
            </form>
          </>
        )}
      </div>
    </div>
  );
}
