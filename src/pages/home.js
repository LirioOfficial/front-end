import { useEffect, useState } from "react";
import Layout from "../componentes/Layout";
import { api } from "../servicos/api";
import { useAuth } from "../contexto/AuthContext";

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function Home() {
  const { token, usuario } = useAuth();
  const [dados, setDados] = useState({
    ocorrencias: [],
    totalOcorrencias: 0,
    tartarugas: [],
    monitoramentos: [],
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api("/ocorrencias?limit=100", { token }),
      api("/tartarugas", { token }),
      api("/monitoramento", { token }),
    ])
      .then(([registros, tartarugas, monitoramentos]) =>
        setDados({
          ocorrencias: registros.items || [],
          totalOcorrencias: registros.pagination?.total || 0,
          tartarugas,
          monitoramentos,
        }),
      )
      .catch((error) => setErro(error.message))
      .finally(() => setCarregando(false));
  }, [token]);

  const agora = new Date();
  const porMes = meses.map(
    (_, indice) =>
      dados.ocorrencias.filter((item) => {
        const data = new Date(item.dataOcorrencia);
        return (
          data.getFullYear() === agora.getFullYear() &&
          data.getMonth() === indice
        );
      }).length,
  );
  const maior = Math.max(...porMes, 1);
  const recentes = dados.ocorrencias.slice(0, 1);

  return (
    <Layout titulo="Início" ativo="/home">
      <div className="boas-vindas">
        <h2>Olá, {usuario?.nome || "usuário"}!</h2>
        <p>Resumo dos dados da sua conta</p>
      </div>
      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}
      <div className="painel">
        <h3>Resumo do monitoramento</h3>
        <div className="metricas">
          <div>
            <img src="/imgs/icon-ocorrencias.png" alt="Ocorrências" />
            <strong>{carregando ? "—" : dados.totalOcorrencias}</strong>
            <span>Ocorrências</span>
          </div>
          <div>
            <img src="/imgs/icon-tartaruga.png" alt="Tartarugas" />
            <strong>{carregando ? "—" : dados.tartarugas.length}</strong>
            <span>Tartarugas</span>
          </div>
          <div>
            <img src="/imgs/icon-ninhos.png" alt="Ninhos" />
            <strong>
              {carregando
                ? "—"
                : dados.ocorrencias.filter((x) => x.tipo === "Ninho").length}
            </strong>
            <span>Ninhos</span>
          </div>
          <div>
            <img src="/imgs/icon-localizacao.png" alt="Monitoramentos" />
            <strong>{carregando ? "—" : dados.monitoramentos.length}</strong>
            <span>Monitoramentos</span>
          </div>
        </div>
      </div>
      <div className="painel grafico">
        <h3>
          Ocorrências por período<small>{agora.getFullYear()}</small>
        </h3>
        <div className="barras">
          {meses.map((mes, i) => (
            <div key={mes}>
              <i
                style={{ height: `${Math.max(3, (porMes[i] / maior) * 96)}px` }}
              />
              <small>{mes}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="painel atividade">
        <h3>
          Atividades recentes<a href="/ocorrencias">Ver todas →</a>
        </h3>
        {carregando ? (
          <p>Carregando registros...</p>
        ) : recentes.length ? (
          recentes.map((item) => (
            <div className="atividade-item" key={item._id}>
              <img src="/imgs/toruga-cinza.png" alt="Registro de ocorrência" />
              <div>
                <b>{item.tipo}</b>
                <small>{item.codigo || "Ocorrência"}</small>
                <small>
                  {item.local?.nome ||
                    item.local?.cidade ||
                    "Local não informado"}
                </small>
                <small>
                  {new Date(item.dataOcorrencia).toLocaleString("pt-BR")}
                </small>
              </div>
              <a href={`/ocorrencias/${item._id}`}>Ver detalhes</a>
            </div>
          ))
        ) : (
          <p>Ainda não há registros de ocorrência.</p>
        )}
      </div>
    </Layout>
  );
}
