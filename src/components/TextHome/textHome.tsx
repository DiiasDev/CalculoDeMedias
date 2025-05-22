import styles from "./styles.module.css";

export default function TextHome() {
  return (
    <div className={styles.container}>
      <div className={styles.textHome}>
        <h1>Bem-vindo ao Sistema de Médias</h1>
        <p className={styles.intro}>
          Gerencie as médias de seus alunos de forma eficiente e prática. Nossa
          plataforma oferece ferramentas intuitivas para facilitar o
          acompanhamento do desempenho acadêmico, ajudando educadores a tomar
          decisões baseadas em dados.
        </p>
        <div className={styles.featuresSection}>
          <h2>Principais Recursos</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h3>Cálculo Automático</h3>
              <p>
                Insira as notas dos alunos e obtenha médias calculadas
                instantaneamente com precisão.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>Tabela de Médias</h3>
              <p>
                Visualize o desempenho de toda a turma em um formato organizado
                e fácil de entender.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>Análise de Desempenho</h3>
              <p>
                Identifique tendências e padrões para melhorar o processo de
                aprendizagem.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.formulaSection}>
          <h3>Como Calculamos as Médias</h3>
          <div className={styles.formula}>
            Média = (Nota1 + Nota2 + ... + NotaN) ÷ N
          </div>
          <p>
            Onde N representa o número total de avaliações consideradas. O
            sistema permite ponderações diferentes para cada avaliação, caso
            necessário.
          </p>
          <p>
            Para aprovação, a média final deve ser igual ou superior a 7.0.
            Médias entre 4.0 e 6.9 indicam necessidade de recuperação.
          </p>
        </div>
      </div>
    </div>
  );
}
