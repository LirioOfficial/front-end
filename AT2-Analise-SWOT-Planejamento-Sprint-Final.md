# AT2 – Análise SWOT e Planejamento da Sprint Final

## 1. Contextualização

O Tugarin é um sistema desenvolvido para auxiliar
o monitoramento e o registro de ocorrências
envolvendo tartarugas marinhas na região de
Cananéia, litoral sul de São Paulo.

O projeto utiliza tecnologias de desenvolvimento
web e investiga técnicas de visão computacional
para apoiar a identificação de tartarugas.

## 2. Diagnóstico Situacional – Análise SWOT

### 2.1 Ambiente Interno

#### Forças (Strengths)
- Sistema desenvolvido com foco em uma necessidade
  real de monitoramento ambiental.
- Interface desenvolvida com React e Next.js.
- Backend desenvolvido com Node.js e Express.
- Utilização do MongoDB como banco de dados.
- Organização das atividades por meio do GitHub Projects.
- Investigação de visão computacional com YOLOv11.

#### Fraquezas (Weaknesses)
- Necessidade de ampliar o conjunto de imagens
  utilizadas no treinamento do modelo.
- Necessidade de aprimorar a precisão da detecção.
- Ajustes pendentes na responsividade da interface.
- Necessidade de avaliar o desempenho do modelo
  em diferentes condições de captura.
- Dependência de testes adicionais para validar
  o funcionamento integrado do sistema.

### 2.2 Ambiente Externo

#### Oportunidades (Opportunities)
- Possibilidade de colaboração com pesquisadores
  e instituições ambientais.
- Ampliação do conjunto de imagens de tartarugas.
- Evolução das técnicas de visão computacional.
- Possibilidade de utilização do sistema em
  atividades reais de monitoramento.
- Expansão das funcionalidades em etapas futuras.

#### Ameaças (Threats)
- Dificuldade de obter imagens suficientes
  para treinamento e validação.
- Variações de iluminação, distância e ângulo
  que podem prejudicar a detecção.
- Instabilidade de conexão durante testes
  que dependam de serviços externos.
- Limitações de orçamento e disponibilidade
  de equipamentos.
- Complexidade de adaptar o protótipo para
  situações reais de monitoramento ambiental.

---

## 3. Matriz TOWS – Plano de Ação Estratégico

| Estratégia | Cruzamento | Ação |
|---|---|---|
| Ofensiva | Forças + Oportunidades | Aproveitar a estrutura do Tugarin e a investigação com YOLOv11 para ampliar as possibilidades de monitoramento. |
| Reforço | Fraquezas + Oportunidades | Ampliar o dataset e realizar novos testes para melhorar a precisão do reconhecimento. |
| Confronto | Forças + Ameaças | Utilizar a organização do sistema e os testes controlados para reduzir problemas de integração e captura. |
| Sobrevivência | Fraquezas + Ameaças | Priorizar funcionalidades essenciais e deixar melhorias de maior complexidade para etapas futuras. |

## 4. Priorização do Backlog – MoSCoW

A priorização das atividades considera quatro categorias:

- Must Have: funcionalidades indispensáveis.
- Should Have: funcionalidades importantes.
- Could Have: melhorias desejáveis.
- Won't Have: funcionalidades adiadas para outro momento.

As prioridades são registradas nas Issues dos
repositórios Front-end e Back-end do Tugarin.

## 5. Planejamento da Sprint Final

### Objetivo

Organizar e priorizar as atividades necessárias
para a consolidação do protótipo Tugarin e sua
apresentação para avaliação acadêmica.

### Atividades acompanhadas

- Ajustar a responsividade da interface.
- Avaliar o desempenho do modelo de detecção.
- Desenvolver a tela informativa das espécies.
- Revisar os detalhes das ocorrências.
- Aprimorar os filtros de consulta.
- Ampliar o dataset de imagens YOLOv11.

As atividades são acompanhadas pelo GitHub Projects,
considerando status, prioridade, esforço e área
de desenvolvimento.

## 6. Definição de Pronto (DoD)

Uma atividade poderá ser considerada concluída quando:

- [ ] A funcionalidade atender aos critérios de aceitação.
- [ ] A implementação estiver integrada ao sistema.
- [ ] Os testes necessários forem realizados.
- [ ] Os erros identificados forem corrigidos.
- [ ] A alteração passar por revisão.
- [ ] A Issue correspondente for atualizada no GitHub.

## 7. Entrega e Continuidade do Projeto

O projeto Tugarin foi apresentado para avaliação
acadêmica em 03 de novembro de 2026.

As funcionalidades e melhorias ainda não concluídas
permanecem organizadas no backlog do projeto.

As próximas evoluções serão planejadas conforme
as necessidades identificadas e a disponibilidade
da equipe no próximo semestre.

## 8. Ferramentas de Gerenciamento

O gerenciamento das atividades é realizado por meio
do GitHub Projects, com utilização de:

- Kanban para acompanhamento do fluxo de trabalho.
- Issues para registro das atividades.
- Labels para classificação e priorização.
- Milestones para organização das entregas.
- Campos de Sprint, Área, Priority e Effort.
