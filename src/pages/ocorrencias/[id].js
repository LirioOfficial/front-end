import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../componentes/Layout";
import { api } from "../../servicos/api";
import { useAuth } from "../../contexto/AuthContext";

const statusPermitidos = ["Pendente", "Em análise", "Concluída"];

export default function DetalheOcorrencia() {
  const router = useRouter();
  const { token } = useAuth();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!token || !router.isReady || !router.query.id) return;
    api(`/ocorrencias/${encodeURIComponent(router.query.id)}`, { token })
      .then((data) => {
        setItem(data);
        setStatus(data.situacao || "Pendente");
      })
      .catch((error) => setErro(error.message));
  }, [token, router.isReady, router.query.id]);

  async function atualizarStatus() {
    if (!item) return;
    setErro("");
    setSalvando(true);
    try {
      setItem(
        await api(`/ocorrencias/${item._id}`, {
          token,
          method: "PATCH",
          body: JSON.stringify({ situacao: status }),
        }),
      );
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout titulo="Detalhes da ocorrência" ativo="/ocorrencias">
      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}
      {!item ? (
        <p className="vazio">Carregando ocorrência...</p>
      ) : (
        <>
          <div className="painel">
            <h3>{item.codigo || "Ocorrência"}</h3>
            <p>
              <b>Tipo:</b> {item.tipo}
            </p>
            <p>
              <b>Espécie:</b> {item.especie}
            </p>
            <p>
              <b>Data:</b>{" "}
              {new Date(item.dataOcorrencia).toLocaleString("pt-BR")}
            </p>
            <p>
              <b>Local:</b>{" "}
              {[item.local?.nome, item.local?.cidade, item.local?.estado]
                .filter(Boolean)
                .join(" · ") || "Não informado"}
            </p>
            <p>
              <b>Observações:</b> {item.observacoes || "—"}
            </p>
            {item.imagens?.map((imagem, index) => (
              <img
                key={`${item._id}-${index}`}
                src={imagem}
                alt={`Imagem da ocorrência ${index + 1}`}
              />
            ))}
          </div>
          <div className="painel">
            <h3>Acompanhamento</h3>
            <label htmlFor="atualizar-status">Situação: {item.situacao}</label>
            <select
              id="atualizar-status"
              value={statusPermitidos.includes(status) ? status : "Pendente"}
              onChange={(event) => setStatus(event.target.value)}
            >
              {statusPermitidos.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <button
              className="btn verde"
              type="button"
              disabled={salvando}
              onClick={atualizarStatus}
            >
              {salvando ? "Atualizando..." : "Atualizar situação"}
            </button>
          </div>
          <button
            className="btn contorno"
            type="button"
            onClick={() => router.push("/ocorrencias")}
          >
            Voltar às ocorrências
          </button>
        </>
      )}
    </Layout>
  );
}
