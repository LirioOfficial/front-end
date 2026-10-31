import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../componentes/Layout";
import { api } from "../../servicos/api";
import { useAuth } from "../../contexto/AuthContext";

const filtros = [
  ["Todas", ""],
  ["Pendentes", "pendentes"],
  ["Em análise", "analise"],
  ["Concluídas", "concluidas"],
];

export default function Ocorrencias() {
  const router = useRouter();
  const { token } = useAuth();
  const [lista, setLista] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = useCallback(async () => {
    if (!token) return;
    setCarregando(true);
    setErro("");
    try {
      const params = new URLSearchParams({ page: String(pagina), limit: "20" });
      if (busca.trim()) params.set("busca", busca.trim());
      if (filtro) params.set("status", filtro);
      const resultado = await api(`/ocorrencias?${params}`, { token });
      setLista(resultado.items || []);
      setPaginas(resultado.pagination?.pages || 1);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }, [token, pagina, busca, filtro]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <Layout titulo="Ocorrências" ativo="/ocorrencias">
      <div className="busca-card">
        <label>Acompanhar ocorrências</label>
        <input
          placeholder="⌕  Buscar por ID, praia ou espécie"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
        />
        <div className="filtros">
          {filtros.map(([nome, valor]) => (
            <button
              type="button"
              key={nome}
              className={filtro === valor ? "ativo" : ""}
              onClick={() => {
                setFiltro(valor);
                setPagina(1);
              }}
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
        <p className="vazio">Carregando ocorrências...</p>
      ) : lista.length === 0 ? (
        <p className="vazio">Ainda não há ocorrências</p>
      ) : (
        <div className="lista-registros">
          {lista.map((item) => (
            <article
              className="registro"
              key={item._id}
              role="link"
              tabIndex={0}
              onClick={() => router.push(`/ocorrencias/${item._id}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter")
                  router.push(`/ocorrencias/${item._id}`);
              }}
            >
              <b>{item.codigo || "Ocorrência"}</b>
              <span>
                {item.tipo} · {item.especie}
              </span>
              <small>
                {item.local?.nome ||
                  item.local?.cidade ||
                  "Local não informado"}
              </small>
              <small>
                {item.situacao} ·{" "}
                {new Date(item.dataOcorrencia).toLocaleDateString("pt-BR")}
              </small>
            </article>
          ))}
          {paginas > 1 && (
            <div className="paginacao">
              <button
                type="button"
                disabled={pagina <= 1}
                onClick={() => setPagina(pagina - 1)}
              >
                Anterior
              </button>
              <span>
                {pagina} / {paginas}
              </span>
              <button
                type="button"
                disabled={pagina >= paginas}
                onClick={() => setPagina(pagina + 1)}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      )}
      <a
        className="botao-flutuante"
        href="/ocorrencias/registrar"
        aria-label="Registrar ocorrência"
      >
        +
      </a>
    </Layout>
  );
}
