import { useEffect, useMemo, useState } from "react";
import Layout from "../componentes/Layout";
import { api } from "../servicos/api";
import { useAuth } from "../contexto/AuthContext";

const filtros = [
  ["Todos", ""],
  ["Avistamentos", "Avistamento"],
  ["Ninhos", "Ninho"],
  ["Encalhes", "Encalhe"],
];

export default function Registros() {
  const { token } = useAuth();
  const [lista, setLista] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!token) return;
    api("/tartarugas", { token })
      .then(setLista)
      .catch((error) => setErro(error.message))
      .finally(() => setCarregando(false));
  }, [token]);

  const filtrados = useMemo(
    () =>
      lista.filter((registro) => {
        const corresponde = !filtro || registro.tipoOcorrencia === filtro;
        const texto = [registro.identificacao, registro.local, registro.especie]
          .join(" ")
          .toLocaleLowerCase("pt-BR");
        return (
          corresponde && texto.includes(busca.trim().toLocaleLowerCase("pt-BR"))
        );
      }),
    [lista, filtro, busca],
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
          {filtrados.map((registro) => (
            <article
              className="registro"
              key={registro._id}
              role="link"
              tabIndex={0}
              onClick={() => {
                window.location.href = `/registros/${registro._id}`;
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter")
                  window.location.href = `/registros/${registro._id}`;
              }}
            >
              <b>{registro.identificacao}</b>
              <span>{registro.especie}</span>
              <small>{registro.local || "Local não informado"}</small>
              <small>{registro.situacao}</small>
            </article>
          ))}
        </div>
      )}
      <a
        className="botao-flutuante"
        href="/registrar"
        aria-label="Adicionar registro"
      >
        +
      </a>
    </Layout>
  );
}
