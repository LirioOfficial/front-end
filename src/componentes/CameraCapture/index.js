import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../servicos/api";

function desenhar(
  canvas,
  previsoes,
  largura,
  altura,
  larguraCaptura,
  alturaCaptura,
) {
  const ctx = canvas.getContext("2d");
  canvas.width = largura;
  canvas.height = altura;
  ctx.clearRect(0, 0, largura, altura);
  const sx = largura / larguraCaptura;
  const sy = altura / alturaCaptura;
  for (const p of previsoes) {
    let x;
    let y;
    let w;
    let h;
    if ([p.x1, p.y1, p.x2, p.y2].every(Number.isFinite)) {
      x = p.x1 * sx;
      y = p.y1 * sy;
      w = (p.x2 - p.x1) * sx;
      h = (p.y2 - p.y1) * sy;
    } else if ([p.x, p.y, p.width, p.height].every(Number.isFinite)) {
      x = (p.x - p.width / 2) * sx;
      y = (p.y - p.height / 2) * sy;
      w = p.width * sx;
      h = p.height * sy;
    } else continue;
    const classe = p.class || p.label || p.class_name || "Tartaruga";
    const confianca = Number.isFinite(p.confidence)
      ? ` ${(p.confidence * 100).toFixed(0)}%`
      : "";
    ctx.lineWidth = Math.max(2, largura / 240);
    ctx.strokeStyle = "#12c7b1";
    ctx.strokeRect(x, y, w, h);
    const texto = `${classe}${confianca}`;
    ctx.font = `bold ${Math.max(13, largura / 32)}px Arial`;
    const tw = ctx.measureText(texto).width;
    const ty = Math.max(0, y - 26);
    ctx.fillStyle = "#12c7b1";
    ctx.fillRect(x, ty, tw + 12, 25);
    ctx.fillStyle = "#062e2a";
    ctx.fillText(texto, x + 6, ty + 18);
  }
}

export default function CameraCapture({ token }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const generationRef = useRef(0);
  const busyRef = useRef(false);
  const failedRef = useRef(false);
  const [ligada, setLigada] = useState(false);
  const [iniciando, setIniciando] = useState(false);
  const [count, setCount] = useState(null);
  const [status, setStatus] = useState("Reconhecimento parado");
  const [mensagem, setMensagem] = useState(
    "Inicie a câmera para começar a análise.",
  );

  const pararTimer = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const analisar = useCallback(async () => {
    const video = videoRef.current;
    if (
      !streamRef.current ||
      !video ||
      video.readyState < 2 ||
      !video.videoWidth ||
      busyRef.current
    )
      return;
    busyRef.current = true;
    try {
      const width = video.videoWidth;
      const height = video.videoHeight;
      const captureWidth = Math.min(640, width);
      const captureHeight = Math.round((height * captureWidth) / width);
      const capture = document.createElement("canvas");
      capture.width = captureWidth;
      capture.height = captureHeight;
      capture
        .getContext("2d")
        .drawImage(video, 0, 0, captureWidth, captureHeight);
      const result = await api("/imagens/analisar", {
        token,
        method: "POST",
        body: JSON.stringify({ imagem: capture.toDataURL("image/jpeg", 0.7) }),
      });
      if (!streamRef.current) return;
      const predictions = Array.isArray(result.predictions)
        ? result.predictions
        : [];
      if (canvasRef.current)
        desenhar(
          canvasRef.current,
          predictions,
          width,
          height,
          captureWidth,
          captureHeight,
        );
      setCount(
        typeof result.count === "number" ? result.count : predictions.length,
      );
      setStatus("Detecção ativa");
      setMensagem("Quadro analisado pelo serviço de detecção.");
    } catch (error) {
      failedRef.current = true;
      setStatus("Falha na detecção");
      setMensagem(error.message);
      pararTimer();
    } finally {
      busyRef.current = false;
    }
  }, [token, pararTimer]);

  const parar = useCallback(() => {
    generationRef.current += 1;
    pararTimer();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    if (canvasRef.current)
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setLigada(false);
    setCount(null);
    setStatus("Reconhecimento parado");
    setMensagem("Câmera encerrada.");
  }, [pararTimer]);

  const iniciar = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMensagem(
        "O navegador não disponibilizou a câmera. Abra em localhost ou HTTPS.",
      );
      return;
    }
    const generation = ++generationRef.current;
    failedRef.current = false;
    setIniciando(true);
    setMensagem("Solicitando acesso à câmera...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      if (generation !== generationRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      const video = videoRef.current;
      video.srcObject = stream;
      setLigada(true);
      await video.play();
      setStatus("Conectando ao detector");
      setMensagem("Câmera ativa. Conectando ao detector...");
      await analisar();
      if (streamRef.current && !failedRef.current)
        timerRef.current = window.setInterval(analisar, 2000);
    } catch (error) {
      if (generation !== generationRef.current) return;
      setMensagem(
        error.name === "NotAllowedError"
          ? "Permissão da câmera negada. Libere o acesso nas configurações do navegador."
          : `Não foi possível iniciar a câmera: ${error.message}`,
      );
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setLigada(false);
    } finally {
      if (generation === generationRef.current) setIniciando(false);
    }
  }, [analisar]);

  useEffect(
    () => () => {
      generationRef.current += 1;
      pararTimer();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    },
    [pararTimer],
  );

  return (
    <>
      <div className="camera-imagem camera-preview">
        <span className="live">
          ● {ligada ? "Ao vivo" : "Câmera desligada"}
        </span>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          hidden={!ligada}
          aria-label="Prévia da câmera"
        />
        <canvas ref={canvasRef} hidden={!ligada} />
        {!ligada && (
          <img src="/imgs/toruga-cinza.png" alt="Prévia da câmera desligada" />
        )}
      </div>
      <p className="camera-message" role="status">
        Tartarugas detectadas: {count ?? "—"} · {status}. {mensagem}
      </p>
      <button
        className="btn verde"
        type="button"
        disabled={iniciando}
        onClick={ligada ? parar : iniciar}
      >
        {iniciando
          ? "Iniciando..."
          : ligada
            ? "Encerrar câmera"
            : "Iniciar câmera"}
      </button>
    </>
  );
}
