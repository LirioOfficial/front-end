import BottomNav from "../BottomNav";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexto/AuthContext";

export default function Layout({ titulo, ativo, children, semNav = false }) {
  const { ready, token } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !token) router.replace("/");
  }, [ready, token, router]);
  if (!ready || !token) return <main className="mobile" aria-live="polite" />;

  return (
    <main className="mobile">
      <header className="topbar">
        <span>{titulo}</span>
      </header>

      <section className="conteudo">{children}</section>

      {!semNav && <BottomNav ativo={ativo} />}
    </main>
  );
}
