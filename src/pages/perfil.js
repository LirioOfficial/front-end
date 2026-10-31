import { useEffect, useState } from "react";
import Layout from "../componentes/Layout";
import { api } from "../servicos/api";
import { useAuth } from "../contexto/AuthContext";

export default function Perfil() {
  const { token, logout } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!token) return;
    api("/usuarios/me", { token })
      .then(({ usuario }) => {
        setPerfil(usuario);
        setNome(usuario.nome || "");
        setEmail(usuario.email || "");
      })
      .catch((error) => setErro(error.message));
  }, [token]);

  async function salvar(evento) {
    evento.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      const data = await api("/usuarios/me", {
        token,
        method: "PATCH",
        body: JSON.stringify({ nome, email }),
      });
      setPerfil(data.usuario);
      setEditando(false);
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout titulo="Perfil" ativo="/perfil">
      <div className="perfil-card">
        <img
          src={perfil?.fotoPerfil || "/imgs/foto-perfil.png"}
          alt="Foto de perfil"
        />
        {editando ? (
          <form className="perfil-edicao" onSubmit={salvar}>
            <label htmlFor="perfil-nome">Nome</label>
            <input
              id="perfil-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="perfil-email">E-mail</label>
            <input
              id="perfil-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="dupla">
              <button
                className="btn contorno"
                type="button"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
              <button className="btn verde" disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3>{perfil?.nome || "Carregando..."}</h3>
            <p>{perfil?.email || ""}</p>
            <button
              className="link-aparencia"
              type="button"
              onClick={() => setEditando(true)}
            >
              Editar dados
            </button>
          </>
        )}
        {erro && (
          <p className="erro" role="alert">
            {erro}
          </p>
        )}
      </div>
      <button className="sair" type="button" onClick={logout}>
        Sair ↪
      </button>
    </Layout>
  );
}
