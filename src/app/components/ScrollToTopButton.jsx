import { useEffect, useState } from "react";
import styles from "../styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton({ onClick }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
            const scrollThreshold = 300;
            setVisible(isScrollable && window.scrollY > scrollThreshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
