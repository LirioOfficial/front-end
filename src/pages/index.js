
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

  // Inicia a subida depois de 1 segundo
  useEffect(() => {
    const temporizador = setTimeout(() => {
      setSaindo(true);
    }, 1000);

    return () => clearTimeout(temporizador);
  }, []);

  // Redireciona usuários autenticados
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
      setErro(error.message || "Não foi possível entrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      {/* LOGIN: permanece montado por baixo da splash */}
      <main
        className="mobile login-screen"
        aria-hidden={mostrarSplash}
      >
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
            disabled={mostrarSplash}
          />

          <label htmlFor="senha">Senha</label>

          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={mostrarSplash}
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
              disabled={carregando || mostrarSplash}
            >
              {carregando ? "Entrando..." : "Acessar"}
            </button>

            <button
              type="button"
              className="btn verde"
              disabled={mostrarSplash}
              onClick={() => router.push("/cadastro-usuario")}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </main>

      {/* SPLASH: fica na frente do login */}
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
            src="/imgs/splash-screen.svg"
            alt="Tugarin"
            className="splash-logo"
            loading="eager"
          />
        </div>
      )}
    </>
  );
}
