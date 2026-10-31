import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { api } from "../servicos/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "tugarin.session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) || "null",
      );
      if (saved?.token && saved?.usuario) setSession(saved);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    const expired = () => {
      setSession(null);
      router.replace("/");
    };
    window.addEventListener("tugarin:session-expired", expired);
    return () => window.removeEventListener("tugarin:session-expired", expired);
  }, [router]);

  const login = useCallback(async (email, senha) => {
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    });
    const nextSession = { token: data.token, usuario: data.usuario };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    return data;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    router.replace("/");
  }, [router]);

  const value = useMemo(
    () => ({ ...session, ready, login, logout }),
    [session, ready, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return value;
}
