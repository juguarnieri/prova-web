import Image from "next/image";
import styles from "./../styles/ParticipantCard.module.css";
import { Card } from "antd";

export default function ParticipantCard({ participante, onClick }) {
    const imageUrl = participante.photo
        ? participante.photo.startsWith("http")
            ? participante.photo
            : `http://localhost:3000/uploads/${participante.photo}`
        : "/images/300.svg";

    return (
        <Card
            className={styles.card}
            hoverable
            onClick={() => onClick(participante)}
            cover={
                <div style={{ width: "100%", height: "220px", position: "relative" }}>
                    <Image
                        className={styles.cardImg}
                        alt={participante.name}
                        src={imageUrl}
                        fill
                        style={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                        onError={(e) => {
                            e.target.src = "/images/300.svg";
                        }}
                        unoptimized
                    />
                </div>
            }
        >
            <Card.Meta
                title={participante.name}
                description={
                    <>
                        {participante.email}
                        <br />
                        <b>Enterprise:</b> {participante.enterprise || "Não informado"}
                    </>
                }
            />
        </Card>
    );
}