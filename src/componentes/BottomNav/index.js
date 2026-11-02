import Link from "next/link";

const itens = [
  {
    nome: "Início",
    imagem: "/imgs/icon-home.svg",
    rota: "/home",
  },
  {
    nome: "Ocorrências",
    imagem: "/imgs/icon-ocorrencias-branco.svg",
    rota: "/ocorrencias",
  },
  {
    nome: "Tugarin",
    imagem: "/imgs/icon-tugarin.svg",
    rota: "/registros",
  },
  {
    nome: "Mapa",
    imagem: "/imgs/icon-mapa.svg",
    rota: "/mapa",
  },
  {
    nome: "Perfil",
    imagem: "/imgs/icon-perfil.png",
    rota: "/perfil",
  },
];

export default function BottomNav({ ativo }) {
  return (
    <nav className="bottom-nav">
      {itens.map((item) => {
        const selecionado = ativo === item.rota;

        return (
          <Link
            href={item.rota}
            key={item.nome}
            scroll={false}
            className={`nav-item ${selecionado ? "ativo" : ""}`}
            aria-label={item.nome}
            aria-current={selecionado ? "page" : undefined}
          >
            <img src={item.imagem} alt={item.nome} />
          </Link>
        );
      })}
    </nav>
  );
}