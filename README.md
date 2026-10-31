# Tugarin Frontend

Frontend independente em React e Next.js. O frontend usa a API Express em `http://localhost:3000` por padrão; a aplicação Next.js inicia em `http://localhost:3001` para evitar conflito de portas.

## Instalação e execução

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

`NEXT_PUBLIC_API_URL` define a origem base do backend. Configure-a em `.env.local` quando a API não estiver em `http://localhost:3000`. Não coloque credenciais, chaves do Roboflow ou segredos JWT nessa variável; por ser pública, ela é incorporada ao frontend.

Para gerar e servir a versão de produção:

```powershell
npm run build
npm start
```

## Sessão e chamadas à API

As chamadas são centralizadas em `src/servicos/api.js`. O login chama `POST /api/auth/login`, guarda somente usuário e JWT em `localStorage` e envia `Authorization: Bearer ...` às rotas privadas. A senha não é persistida. O backend emite JWT com validade de oito horas; uma resposta 401 limpa a sessão e volta à tela de login. O botão Sair também limpa a sessão. O cadastro chama `POST /api/auth/cadastro`.

O backend usa a porta 3000 e o frontend a 3001. O CORS local do backend permite `http://localhost:3001`; configure `CORS_ORIGINS` com a origem real do frontend em outros ambientes.

## Funcionalidades ligadas

- Início consulta ocorrências, tartarugas e monitoramentos para atualizar os totais e atividades.
- Perfil consulta e atualiza `/api/usuarios/me`.
- `/ocorrencias` acompanha, filtra por situação, pesquisa e detalha ocorrências. O cadastro separado usa `/api/ocorrencias`.
- `/registros` lista e pesquisa tartarugas, com filtros por tipo. O formulário dividido em duas etapas salva em `/api/tartarugas` e envia a imagem para os campos de foto existentes.
- `/mapa` lista câmeras de `/api/monitoramento` e posiciona as que têm coordenadas cadastradas. Selecionar uma câmera abre `/monitoramento?id=...`, que consulta `GET /api/monitoramento/:id`.
- A tela de monitoramento mostra a imagem atual e detecções vinculadas à câmera selecionada, quando disponíveis. Ela também mantém a captura da câmera do dispositivo: os quadros JPEG são enviados a cada dois segundos para `POST /api/imagens/analisar` com o JWT; as previsões são desenhadas sobre o vídeo e as trilhas são encerradas ao sair.
- A câmera exige permissão do navegador e uma origem segura (HTTPS ou localhost). A análise exige `ROBOFLOW_API_KEY` no backend. A chave nunca é enviada ao browser. O endpoint de análise não persiste cada quadro como detecção.

## Limitações do contrato atual da API

O formulário visual de registro contém sexo, fase de vida e medidas, mas o modelo `Ocorrencia` não possui esses campos. Eles não são enviados nem armazenados. O registro enviado contém tipo, espécie, data, local, situação, observações, código opcional e imagem opcional. Para persistir os demais campos sem misturar dados de tartaruga e ocorrência, o backend precisa definir uma entidade/associação apropriada.

O mapa atual não tinha integração cartográfica. A tela mostra nomes de locais vindos das ocorrências, sem posicionar marcadores. Uma integração geográfica real requer um provedor escolhido e coordenadas confiáveis cadastradas; nenhuma localização é fabricada.

## Verificações

`npm run build` valida a compilação Next.js. O projeto ainda não possui configuração nem script de lint ou testes automatizados de frontend.
