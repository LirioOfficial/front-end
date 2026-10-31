import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../componentes/Layout";
import { api } from "../servicos/api";
import { useAuth } from "../contexto/AuthContext";

const coordenadaValida = (value) =>
  value !== null &&
  value !== undefined &&
  value !== "" &&
  Number.isFinite(Number(value));

function posicionar(cameras) {
  const validas = cameras.filter(
    (camera) =>
      coordenadaValida(camera.latitude) && coordenadaValida(camera.longitude),
  );
  if (!validas.length) return [];
  const latitudes = validas.map((camera) => Number(camera.latitude));
  const longitudes = validas.map((camera) => Number(camera.longitude));
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  return validas.map((camera) => ({
    ...camera,
    x:
      maxLon === minLon
        ? 50
        : 8 + ((Number(camera.longitude) - minLon) / (maxLon - minLon)) * 84,
    y:
      maxLat === minLat
        ? 50
        : 8 + ((maxLat - Number(camera.latitude)) / (maxLat - minLat)) * 84,
  }));
}

export default function Mapa() {
  const { token } = useAuth();
  const router = useRouter();
  const [cameras, setCameras] = useState([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!token) return;
    api("/monitoramento", { token })
      .then(setCameras)
      .catch((error) => setErro(error.message))
      .finally(() => setCarregando(false));
  }, [token]);

  const filtradas = useMemo(
    () =>
      cameras.filter((camera) =>
        [
          camera.nome,
          camera.identificacao,
          camera.local,
          camera.cidade,
          camera.estado,
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("pt-BR")
          .includes(busca.trim().toLocaleLowerCase("pt-BR")),
      ),
    [cameras, busca],
  );
  const marcadores = useMemo(() => {
    const selecionados = new Set(filtradas.map((camera) => String(camera._id)));
    return posicionar(cameras).filter((camera) =>
      selecionados.has(String(camera._id)),
    );
  }, [cameras, filtradas]);
  const abrirCamera = (camera) =>
    router.push({ pathname: "/monitoramento", query: { id: camera._id } });

  return (
    <Layout titulo="Mapa" ativo="/mapa">
      <div className="mapa">
        <input
          aria-label="Pesquisar local ou câmera"
          placeholder="Pesquisar local"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
        <div
          className="pins"
          style={{ position: "relative", height: "calc(100% - 90px)" }}
          aria-label="Câmeras de monitoramento"
        >
          {marcadores.map((camera) => (
            <button
              key={camera._id}
              type="button"
              title={`${camera.nome} · ${camera.identificacao}`}
              aria-label={`Abrir ${camera.nome}, câmera ${camera.identificacao}`}
              onClick={() => abrirCamera(camera)}
              style={{
                position: "absolute",
                left: `${camera.x}%`,
                top: `${camera.y}%`,
                transform: "translate(-50%, -50%)",
                padding: 0,
                border: 0,
                background: "transparent",
                color: "inherit",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              ⌖
            </button>
          ))}
          {!carregando && filtradas.length > 0 && marcadores.length === 0 && (
            <span>Nenhuma câmera possui coordenadas cadastradas</span>
          )}
          {!carregando && filtradas.length === 0 && (
            <span>
              {cameras.length
                ? "Nenhuma câmera encontrada"
                : "Nenhuma câmera cadastrada"}
            </span>
          )}
        </div>
        <p>
          {erro ||
            (carregando
              ? "Carregando câmeras..."
              : filtradas
                  .map(
                    (camera) =>
                      `${camera.nome} · ${camera.identificacao}${coordenadaValida(camera.latitude) && coordenadaValida(camera.longitude) ? "" : " (sem coordenadas)"}`,
                  )
                  .join(" | "))}
        </p>
        {erro && (
          <span className="erro" role="alert">
            {erro}
          </span>
        )}
      </div>
    </Layout>
  );
}
