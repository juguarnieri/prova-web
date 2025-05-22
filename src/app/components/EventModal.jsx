import { Modal, Skeleton } from "antd";
import styles from "./../styles/EventModal.module.css";

export default function EventModal({ modalInfo, onClose }) {
    return (
        <Modal
            title={`Evento de ${modalInfo.participante?.name || ""}`}
            open={modalInfo.visible}
            onCancel={onClose}
            onOk={onClose}
            width={600}
        >
            {modalInfo.loading ? (
                <Skeleton active />
            ) : modalInfo.evento ? (
                <div className={styles.avaliacaoInfo}>
                    <span className={styles.label}>Nome do Evento:</span>{" "}
                    {modalInfo.evento.name}
                    <br />
                    <span className={styles.label}>Descrição:</span>{" "}
                    {modalInfo.evento.description}
                    <br />
                    <span className={styles.label}>Data:</span>{" "}
                    {modalInfo.evento.date}
                    <br />
                    <span className={styles.label}>Local:</span>{" "}
                    {modalInfo.evento.location}
                </div>
            ) : (
                <p style={{ textAlign: "center" }}>Evento não encontrado.</p>
            )}
        </Modal>
    );
}