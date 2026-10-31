import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../servicos/api";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await api("/auth/cadastro", {
        method: "POST",
        body: JSON.stringify({ nome, email, senha }),
      });
      router.push("/");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="mobile login-screen">
      <h1 className="titulo-cadastro">Criar conta</h1>
      <form className="login-form" onSubmit={enviar}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
        />
        <label htmlFor="cadastro-email">E-mail</label>
        <input
          id="cadastro-email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <label htmlFor="cadastro-senha">Senha</label>
        <input
          id="cadastro-senha"
          type="password"
          placeholder="Mínimo de 8 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          minLength={8}
          autoComplete="new-password"
          required
        />
        {erro && (
          <p className="erro" role="alert">
            {erro}
          </p>
        )}
        <button className="btn verde" type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </main>
  );
}
