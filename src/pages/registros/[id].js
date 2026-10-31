import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../componentes/Layout";
import { api } from "../../servicos/api";
import { useAuth } from "../../contexto/AuthContext";

export default function DetalheTartaruga() {
  const router = useRouter();
  const { token } = useAuth();
  const [item, setItem] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!token || !router.isReady || !router.query.id) return;
    api(`/tartarugas/${encodeURIComponent(router.query.id)}`, { token })
      .then(setItem)
      .catch((error) => setErro(error.message));
  }, [token, router.isReady, router.query.id]);

  return (
    <Layout titulo="Registro da tartaruga" ativo="/registros">
      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}
      {!item ? (
        <p className="vazio">Carregando registro...</p>
      ) : (
        <div className="painel">
          {(item.fotoPrincipal || item.imagem) && (
            <img
              src={item.fotoPrincipal || item.imagem}
              alt={`Imagem de ${item.identificacao}`}
            />
          )}
          <h3>{item.identificacao}</h3>
          <p>
            <b>Espécie:</b> {item.especie}
          </p>
          <p>
            <b>Tipo:</b> {item.tipoOcorrencia || "Não informado"}
          </p>
          <p>
            <b>Local:</b> {item.local || "Não informado"}
          </p>
          <p>
            <b>Data:</b>{" "}
            {item.dataOcorrencia
              ? new Date(item.dataOcorrencia).toLocaleString("pt-BR")
              : "Não informada"}
          </p>
          <p>
            <b>Situação:</b> {item.situacao}
          </p>
          <p>
            <b>Sexo:</b> {item.sexo || "Não informado"}
          </p>
          <p>
            <b>Fase:</b> {item.fase || "Não informada"}
          </p>
          <p>
            <b>Medidas:</b>{" "}
            {item.medidas
              ? `${item.medidas.comprimento ?? "—"} cm × ${item.medidas.largura ?? "—"} cm · ${item.medidas.peso ?? "—"} kg`
              : "Não informadas"}
          </p>
          <p>
            <b>Observações:</b> {item.observacoes || "—"}
          </p>
        </div>
      )}
      <button
        className="btn contorno"
        type="button"
        onClick={() => router.push("/registros")}
      >
        Voltar aos registros
      </button>
    </Layout>
  );
}
