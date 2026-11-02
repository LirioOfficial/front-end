
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexto/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [saindo, setSaindo] = useState(false);

  const router = useRouter();
  const { login, ready, token } = useAuth();

  // Inicia a subida quase imediatamente
  useEffect(() => {
    const inicio = setTimeout(() => {
      setSaindo(true);
    }, 50);

    return () => clearTimeout(inicio);
  }, []);

  // Redireciona usuários autenticados após a splash terminar
  useEffect(() => {
    if (!mostrarSplash && ready && token) {
      router.replace("/home");
    }
  }, [mostrarSplash, ready, token, router]);

  async function entrar(evento) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await login(email, senha);
      router.push("/home");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      {mostrarSplash && (
        <div
          className={`splash-screen ${saindo ? "saindo" : ""}`}
          onTransitionEnd={(evento) => {
            if (
              evento.target === evento.currentTarget &&
              evento.propertyName === "transform"
            ) {
              setMostrarSplash(false);
            }
          }}
        >
          <img
            src="/imgs/Splash-screen.svg"
            alt="Tugarin"
            className="splash-logo"
            loading="eager"
          />
        </div>
      )}

      <main className="mobile login-screen">
        <div className="login-logo">TUGARIN</div>

        <form onSubmit={entrar} className="login-form">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && (
            <p className="erro" role="alert">
              {erro}
            </p>
          )}

          <div className="login-actions">
            <button
              type="submit"
              className="btn azul"
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Acessar"}
            </button>

            <button
              type="button"
              className="btn verde"
              onClick={() => router.push("/cadastro-usuario")}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
