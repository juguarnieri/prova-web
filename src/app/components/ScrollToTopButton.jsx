import styles from "../styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton({ visible, onClick }) {
    if (!visible) return null;

    return (
        <button
            onClick={onClick}
            className={styles.button}
            aria-label="Subir ao topo"
            title="Subir ao topo"
            role="button"
            tabIndex={0}
        >
            <span aria-hidden="true">↑</span>
        </button>
    );
}
