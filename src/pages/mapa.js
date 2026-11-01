import { useRouter } from 'next/router';
import Layout from '../componentes/Layout';

const cameras = [
  {
    id: 'CAM_01',
    local: 'Baía dos Golfinhos',
    top: '19%',
    left: '49%'
  },
  {
    id: 'CAM_02',
    local: 'Sambaqui do Norte',
    top: '35%',
    left: '12%'
  },
  {
    id: 'CAM_03',
    local: 'Boqueirão Sul',
    top: '56%',
    left: '45%'
  },
  {
    id: 'CAM_04',
    local: 'Praia do Pereirinha',
    top: '82%',
    left: '20%'
  },
  {
    id: 'CAM_05',
    local: 'Praia do Pereirinha',
    top: '82%',
    left: '89%'
  }
];

export default function Mapa() {
  const router = useRouter();

  function abrirCamera(camera) {
    router.push({
      pathname: '/monitoramento',
      query: {
        camera: camera.id,
        local: camera.local
      }
    });
  }

  return (
    <Layout titulo="Mapa" ativo="/mapa">

      <div className="mapa-tela">

        <div className="mapa-imagem">

          <img
            src="/imgs/mapa.png"
            alt="Mapa da região de Cananéia"
            className="mapa-fundo"
          />

          <div className="mapa-busca">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Pesquisar local"
            />
          </div>

          {cameras.map((camera) => (
            <button
              key={camera.id}
              type="button"
              className="marcador-camera"
              style={{
                top: camera.top,
                left: camera.left
              }}
              onClick={() => abrirCamera(camera)}
              aria-label={`Abrir ${camera.id} - ${camera.local}`}
            >
              <img
                src="/imgs/loc-cameras.png"
                alt=""
              />
            </button>
          ))}

        </div>

      </div>

    </Layout>
  );
}