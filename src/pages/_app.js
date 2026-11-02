
import "../styles.css";
import { AuthProvider } from "../contexto/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}


export default function App({ Component, pageProps }) {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000);

    return () => clearTimeout(temporizador);
  }, []);

  return (
    <AuthProvider>
      {mostrarSplash ? (
        <main className="splash-screen">
          <img
            src="/imgs/splash-screen.svg"
            alt="Tugarin"
            className="splash-logo"
          />
        </main>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}