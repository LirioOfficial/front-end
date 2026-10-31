import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../componentes/Layout";
import CameraCapture from "../componentes/CameraCapture";
import { api } from "../servicos/api";
import { useAuth } from "../contexto/AuthContext";

const idDe = (value) => String(value?._id || value || "");

export default function Monitoramento() {
  const router = useRouter();
  const { token } = useAuth();
  const [camera, setCamera] = useState(null);
  const [deteccoes, setDeteccoes] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const cameraId = router.query.id;

  useEffect(() => {
    if (!router.isReady) return;
    if (!cameraId) {
      router.replace("/mapa");
      return;
    }
    if (!token) return;
    setCarregando(true);
    Promise.all([
      api(`/monitoramento/${encodeURIComponent(cameraId)}`, { token }),
      api("/deteccoes", { token }),
    ])
      .then(([selected, allDeteccoes]) => {
        setCamera(selected);
        setDeteccoes(
          allDeteccoes.filter(
            (item) => idDe(item.monitoramento) === idDe(selected._id),
          ),
        );
      })
      .catch((error) => setErro(error.message))
      .finally(() => setCarregando(false));
  }, [router.isReady, cameraId, token, router]);

  return (
    <Layout titulo="Monitoramento" ativo="/mapa">
      {carregando ? (
        <p className="vazio">Carregando câmera...</p>
      ) : erro ? (
        <p className="erro" role="alert">
          {erro}
        </p>
      ) : (
        camera && (
          <>
            <div className="camera-titulo">
              {camera.nome}
              <small>{camera.identificacao}</small>
            </div>
            <div className="camera-card">
              <div className="camera-imagem">
                <span className="live">
                  ● {camera.estadoConexao || "desconectada"}
                </span>
                {camera.imagemAtual ? (
                  <img
                    src={camera.imagemAtual}
                    alt={`Imagem atual de ${camera.nome}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 1,
                    }}
                  />
                ) : (
                  <span>Transmissão indisponível</span>
                )}
              </div>
              <div className="camera-info">
                <span>
                  {[camera.local, camera.cidade, camera.estado]
                    .filter(Boolean)
                    .join(" · ") || "Local não cadastrado"}
                </span>
                <small>
                  {camera.ultimaAtualizacao
                    ? `Atualizado: ${new Date(camera.ultimaAtualizacao).toLocaleString("pt-BR")}`
                    : "Sem atualização registrada"}
                </small>
              </div>
            </div>
            <div className="painel">
              <h3>Atividade recente</h3>
              {deteccoes.length ? (
                deteccoes.slice(0, 5).map((item) => (
                  <p key={item._id}>
                    {item.especieDetectada || "Detecção"} ·{" "}
                    {new Date(item.dataDeteccao).toLocaleString("pt-BR")} ·{" "}
                    {item.statusRevisao}
                  </p>
                ))
              ) : (
                <p>Nenhuma detecção vinculada a esta câmera.</p>
              )}
              <p>Ocorrências relacionadas: sem associação disponível na API.</p>
            </div>
            <h3 className="subtitulo">Câmera do dispositivo</h3>
            <CameraCapture token={token} />
            <button
              className="btn contorno"
              type="button"
              onClick={() => router.push("/mapa")}
            >
              Voltar ao mapa
            </button>
          </>
        )
      )}
    </Layout>
  );
}
