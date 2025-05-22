"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import ParticipantsList from "../components/ParticipantsList";
import EventModal from "../components/EventModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "../participantes/Participantes.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function HomePage() {
  const [data, setData] = useState({
    participantes: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    participante: null,
    evento: null,
    loading: false,
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

  const openModal = async (participante) => {
    setModalInfo({ visible: true, participante, evento: null, loading: true });

    toast.success(`Participante ${participante.name} selecionado com sucesso!`);

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${participante.event_id}`,
        { headers: HEADERS }
      );
      setModalInfo((m) => ({ ...m, evento: data.data, loading: false }));
    } catch {
      toast.error("Erro ao carregar evento.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedParticipants = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.participantes.slice(start, start + data.pageSize);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.pageContainer}>
      <Link href="/profile" className={styles.backIconButton} aria-label="Voltar para o Perfil">
        <ArrowLeftOutlined />
      </Link>

      <h1 className={styles.header}>Lista de Participantes</h1>

      <div className={styles.paginationWrapper}>
        <Pagination
          current={data.current}
          pageSize={data.pageSize}
          total={data.participantes.length}
          onChange={(page, size) =>
            setData((d) => ({ ...d, current: page, pageSize: size }))
          }
          showSizeChanger
          pageSizeOptions={["5", "10", "50"]}
        />
      </div>

      {data.loading ? (
        <div className={styles.loadingWrapper}>
          <Image
            src="/images/loading.gif"
            width={50}
            height={50}
            alt="Loading"
            unoptimized
          />
        </div>
      ) : (
        <ParticipantsList
          participantes={paginatedParticipants()}
          onCardClick={openModal}
        />
      )}

      <ScrollToTopButton onClick={scrollToTop} />

      <EventModal
        modalInfo={modalInfo}
        onClose={() =>
          setModalInfo({
            visible: false,
            participante: null,
            evento: null,
            loading: false,
          })
        }
      />

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}