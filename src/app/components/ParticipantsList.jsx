import ParticipantCard from "./ParticipantCard";
import styles from "../participantes/Participantes.module.css";

export default function ParticipantsList({ participantes, onCardClick }) {
  return (
    <div className={styles.cardsContainer}>
      {participantes.map((participante) => (
        <ParticipantCard
          key={participante.id}
          participante={participante}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}