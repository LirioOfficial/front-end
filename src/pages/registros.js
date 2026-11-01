
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Layout from "../componentes/Layout";
import { api } from "../servicos/api";
import { useAuth } from "../contexto/AuthContext";

const filtros = [
  ["Todos", ""],
  ["Avistamentos", "Avistamento"],
  ["Ninhos", "Ninho"],
  ["Encalhes", "Encalhe"],
];

function obterImagem(registro) {
  const imagem =
    registro.imagem?.url ||
    registro.imagemUrl ||
    registro.foto?.url ||
    registro.foto ||
    registro.imageUrl ||
    registro.imagem;

  return typeof imagem === "string" && imagem
    ? imagem
    : "/imgs/toruga-cinza.png";
}

function formatarData(data) {
  if (!data) return "";

  const dataValida = new Date(data);

  if (Number.isNaN(dataValida.getTime())) return "";

  return dataValida.toLocaleDateString("pt-BR");
}

export default function Registros() {
  const { token, ready } = useAuth();

  const [lista, setLista] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!ready) return;

    if (!token) {
      setCarregando(false);
      return;
    }

    api("/tartarugas", { token })
      .then((dados) => {
        setLista(Array.isArray(dados) ? dados : []);
      })
      .catch((error) => setErro(error.message))
      .finally(() => setCarregando(false));
  }, [token, ready]);

  const filtrados = useMemo(
    () =>
      lista.filter((registro) => {
        const corresponde =
          !filtro || registro.tipoOcorrencia === filtro;

        const texto = [
          registro.identificacao,
          registro.local,
          registro.especie,
        ]
          .join(" ")
          .toLocaleLowerCase("pt-BR");

        return (
          corresponde &&
          texto.includes(busca.trim().toLocaleLowerCase("pt-BR"))
        );
      }),
    [lista, filtro, busca]
  );

  return (
    <Layout titulo="Registros" ativo="/registros">

      <div className="busca-card">
        <label>Acompanhar registros</label>

        <input
          placeholder="⌕  Buscar por ID, praia ou espécie"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="filtros">
          {filtros.map(([nome, valor]) => (
            <button
              type="button"
              key={nome}
              className={filtro === valor ? "ativo" : ""}
              onClick={() => setFiltro(valor)}
            >
              {nome}
            </button>
          ))}
        </div>
      </div>

      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="vazio">Carregando registros...</p>
      ) : filtrados.length === 0 ? (
        <p className="vazio">
          {lista.length
            ? "Nenhum registro encontrado"
            : "Ainda não há registros"}
        </p>
      ) : (
        <div className="lista-registros">

          {filtrados.map((registro) => {
            const imagem = obterImagem(registro);

            const data = formatarData(
              registro.data || registro.createdAt
            );

            const status = registro.status || "Registrado";

            return (
              <article
                className="registro-card"
                key={registro._id}
              >

                <img
                  className="registro-imagem"
                  src={imagem}
                  alt={registro.especie || "Imagem do registro"}
                  onError={(e) => {
                    e.currentTarget.src = "/imgs/toruga-cinza.png";
                  }}
                />

                <div className="registro-conteudo">

                  <strong>
                    {registro.especie || "Espécie não identificada"}
                  </strong>

                  <small>
                    Ocorrência #{registro.identificacao || registro._id}
                  </small>

                  <small>
                    {registro.local || "Local não informado"}
                  </small>

                  {data && (
                    <small>{data}</small>
                  )}

                  <span className="registro-status">
                    {status}
                  </span>

                </div>

                <Link
                  href={`/registros/${registro._id}`}
                  className="registro-detalhes"
                >
                  Ver detalhes
                </Link>

              </article>
            );
          })}

        </div>
      )}

      <Link
        className="botao-flutuante"
        href="/registrar"
        aria-label="Adicionar registro"
      >
        +
      </Link>

    </Layout>
  );
}
