"use client";

import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { Button, Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import Carregando from "../components/Carregando";
import axios from "axios";
import { toast } from "react-toastify";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Profile() {
  const [data, setData] = useState({
    participantes: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/participants`,
          { headers: HEADERS }
        );
        setData({ participantes: data.data, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar participantes");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchParticipants();
  }, []);

  if (data.loading) return <Carregando />;

  return (
    <div className={styles.container}>
      <Card hoverable className={styles.card}>
        <Typography.Title level={2} className={styles.title}>
          Júlia Andrade Guarnieri
        </Typography.Title>
        <div className={styles.imageContainer}>
          <Image
            src="/images/image.png" 
            alt="Foto de Júlia Andrade Guarnieri"
            width={160}
            height={160}
            className={styles.image}
          />
        </div>
        <Typography.Paragraph className={styles.info}>
          <b>Professores:</b> Thiago e Marcelo
        </Typography.Paragraph>
          <Typography.Paragraph className={styles.info}>
          <b>Turma:</b> 2TDS1
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.info}>
          <b>Matéria:</b> Desenvolvimento Front-End
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.info}>
          <b>Atividade:</b> Prova Prática Front-End
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.explanation}>
          Esta aplicação consome uma API protegida por API Key, listando participantes e eventos de forma dinâmica. Utiliza Next.js, Ant Design e Axios para uma experiência moderna e eficiente.
        </Typography.Paragraph>
        <Link href="/participantes" prefetch>
          <Button type="primary" className={styles.button}>
            Ver Participantes
          </Button>
        </Link>
      </Card>
    </div>
  );
}