
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../componentes/Layout';
import { useAuth } from '../contexto/AuthContext';
import { api } from '../servicos/api';

export default function Monitoramento() {
  const router = useRouter();
  const { token, ready } = useAuth();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervaloRef = useRef(null);
  const processandoRef = useRef(false);

  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [cameraExpandida, setCameraExpandida] = useState(false);
  const [erro, setErro] = useState('');
  const [deteccoes, setDeteccoes] = useState([]);
  const [total, setTotal] = useState(0);
  const [ultimaAnalise, setUltimaAnalise] = useState(null);

  const cameraId = router.query.camera || 'CAM_05';
  const local = router.query.local || 'Baía dos Golfinhos';

  async function analisarImagem() {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      processandoRef.current
    ) {
      return;
    }

    if (!ready || !token) {
      setErro('Sessão não autenticada. Faça login novamente.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      return;
    }

    processandoRef.current = true;

    try {
      const largura = Math.min(video.videoWidth, 640);
      const proporcao = video.videoHeight / video.videoWidth;
      const altura = Math.round(largura * proporcao);

      canvas.width = largura;
      canvas.height = altura;

      const contexto = canvas.getContext('2d');

      contexto.drawImage(
        video,
        0,
        0,
        largura,
        altura
      );

      const imagem = canvas.toDataURL('image/jpeg', 0.65);

      const dados = await api('/imagens/analisar', {
        method: 'POST',
        token,
        body: JSON.stringify({ imagem })
      });

      const resultados = dados.predictions || [];

      setDeteccoes(resultados);
      setTotal(dados.count ?? resultados.length);
      setUltimaAnalise(new Date());
      setErro('');

    } catch (error) {
      setErro(error.message);
    } finally {
      processandoRef.current = false;
    }
  }

  async function iniciarCamera() {
    setErro('');

    try {
      if (!ready || !token) {
        throw new Error('Faça login novamente para utilizar o monitoramento.');
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          'Acesse pelo HTTPS ou localhost para utilizar a câmera.'
        );
      }

      const permissao = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: {
            ideal: 'environment'
          },
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        }
      });

      streamRef.current = permissao;
      videoRef.current.srcObject = permissao;

      await videoRef.current.play();

      setCameraAtiva(true);

      intervaloRef.current = setInterval(() => {
        analisarImagem();
      }, 2500);

    } catch (error) {
      setErro(
        error.name === 'NotAllowedError'
          ? 'Permita o acesso à câmera nas configurações do navegador.'
          : error.message
      );
    }
  }

  function encerrarCamera() {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraAtiva(false);
    setCameraExpandida(false);
  }

  useEffect(() => {
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <Layout titulo="Monitoramento" ativo="/monitoramento">

      <div className="monitoramento-titulo">
        <strong>{local}</strong>
        <small>{cameraId}</small>
      </div>

      <div className="monitoramento-camera">

        <div
          className={`video-container ${
            cameraExpandida ? 'camera-expandida' : ''
          }`}
        >

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="video-camera"
          />

          {!cameraAtiva && (
            <div className="camera-placeholder">
              <img
                src="/imgs/loc-cameras.png"
                alt="Câmera"
              />
              <span>Câmera desligada</span>
            </div>
          )}

          {cameraAtiva && (
            <span className="camera-live">
              ● Ao vivo
            </span>
          )}

          <button
            type="button"
            className="botao-expandir-camera"
            onClick={() => setCameraExpandida(!cameraExpandida)}
            aria-label={
              cameraExpandida
                ? 'Reduzir câmera'
                : 'Ampliar câmera'
            }
          >
            {cameraExpandida ? '✕' : '⛶'}
          </button>

        </div>

        <canvas
          ref={canvasRef}
          className="canvas-analise"
        />

        <div className="monitoramento-info">
          <span>Cananéia - SP</span>

          <small>
            {ultimaAnalise
              ? `Última análise: ${ultimaAnalise.toLocaleTimeString('pt-BR')}`
              : 'Aguardando câmera'}
          </small>
        </div>

        <p className="status-camera">
          {cameraAtiva
            ? 'Câmera conectada'
            : 'Câmera desconectada'}
        </p>

        {erro && (
          <p className="erro-camera">
            {erro}
          </p>
        )}

        <button
          type="button"
          className="btn verde botao-camera"
          onClick={cameraAtiva ? encerrarCamera : iniciarCamera}
        >
          {cameraAtiva ? 'Encerrar câmera' : 'Iniciar câmera'}
        </button>

      </div>

      <div className="painel atividade-deteccao">

        <h3>Atividade recente</h3>

        <div className="dados-deteccao">

          <div>
            <small>Detecções recentes</small>
            <strong>{total}</strong>
          </div>

          <div>
            <small>Última análise</small>
            <strong>
              {ultimaAnalise
                ? ultimaAnalise.toLocaleTimeString('pt-BR')
                : '—'}
            </strong>
          </div>

        </div>

        {deteccoes.length > 0 ? (
          <div className="lista-deteccoes">
            {deteccoes.map((item, index) => (
              <div className="deteccao-item" key={index}>
                <strong>
                  {item.class || item.label || 'Tartaruga detectada'}
                </strong>

                <small>
                  Confiança: {(
                    (item.confidence || 0) * 100
                  ).toFixed(1)}%
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="sem-deteccoes">
            {cameraAtiva
              ? 'Nenhuma tartaruga identificada na última análise.'
              : 'Inicie a câmera para começar a análise.'}
          </p>
        )}

      </div>

      <h3 className="subtitulo">
        Ocorrências anteriores
      </h3>

      <div className="registro">
        <b>Tartaruga adulta</b>
        <small>Ocorrência #003 · Baía dos Golfinhos - Cananéia</small>
        <small>Pendente</small>
      </div>

    </Layout>
  );
}
