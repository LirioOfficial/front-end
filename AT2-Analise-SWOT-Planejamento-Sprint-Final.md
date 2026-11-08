# AT2 – Análise SWOT e Planejamento da Sprint Final

## 1. Contextualização

O Tugarin é um sistema desenvolvido para auxiliar o monitoramento e o registro de ocorrências envolvendo tartarugas marinhas na região de Cananéia, litoral sul do estado de São Paulo.

A aplicação busca centralizar informações relacionadas às ocorrências, permitindo o registro de dados dos animais, imagens e informações de localização, contribuindo para a organização das atividades de monitoramento ambiental.

O desenvolvimento utiliza React e Next.js no Front-end, Node.js e Express no Back-end e MongoDB para armazenamento dos dados. Além disso, o projeto investiga técnicas de visão computacional por meio do modelo YOLOv11, com o objetivo de apoiar a identificação de tartarugas.

## 2. Diagnóstico Situacional – Análise SWOT

### 2.1 Ambiente Interno

#### Forças (Strengths)
- Desenvolvimento de uma aplicação direcionada a uma necessidade real de monitoramento ambiental.
- Separação entre Front-end e Back-end, favorecendo a organização e a manutenção do sistema.
- Utilização de React e Next.js para desenvolvimento da interface.
- Utilização de Node.js e Express para implementação dos serviços e das rotas da aplicação.
- Utilização do MongoDB como banco de dados não relacional.
- Organização e acompanhamento das atividades por meio do GitHub Projects.
- Investigação de visão computacional utilizando YOLOv11.
- Desenvolvimento de funcionalidades para registro, consulta e acompanhamento de ocorrências.

#### Fraquezas (Weaknesses)
- Necessidade de ampliar o conjunto de imagens anotadas para treinamento e avaliação do modelo YOLOv11.
- Necessidade de realizar novos testes para avaliar a precisão das detecções.
- Ajustes pendentes na responsividade de algumas telas.
- Necessidade de avaliar o comportamento do modelo em diferentes condições de iluminação, distância e posicionamento.
- Necessidade de ampliar os testes de integração entre os módulos da aplicação.
- Limitações decorrentes da utilização de miniaturas nos experimentos iniciais de reconhecimento.

### 2.2 Ambiente Externo

#### Oportunidades (Opportunities)
- Possibilidade de colaboração com pesquisadores e instituições ambientais.
- Possibilidade de ampliar o conjunto de imagens por meio de novos registros e experimentos.
- Evolução das técnicas de visão computacional aplicadas ao monitoramento de animais.
- Possibilidade de utilização futura do sistema em atividades reais de monitoramento ambiental.
- Expansão das funcionalidades de acordo com as necessidades identificadas pelos pesquisadores.
- Possibilidade de aperfeiçoamento do sistema por meio de novos ciclos de desenvolvimento e validação.

#### Ameaças (Threats)
- Dificuldade de obter quantidade suficiente de imagens representativas para treinamento e validação.
- Variações de iluminação, distância, ângulo e posicionamento que podem comprometer a identificação dos animais.
- Instabilidade de conexão durante testes que dependam de serviços externos.
- Limitações de orçamento e disponibilidade de equipamentos para experimentos.
- Complexidade de adaptar os testes realizados com miniaturas para condições reais de monitoramento ambiental.
- Necessidade de validação adicional antes da utilização da identificação automática em situações reais.

---

## 3. Matriz TOWS – Plano de Ação Estratégico

A partir dos fatores identificados na análise SWOT, foram estabelecidas estratégias para orientar a evolução do Tugarin e auxiliar na definição das prioridades de desenvolvimento.

| Estratégia | Cruzamento | Ação Estratégica |
|---|---|---|
| Ofensiva | Forças + Oportunidades | Aproveitar a estrutura da aplicação e a investigação com YOLOv11 para desenvolver e aperfeiçoar os recursos de monitoramento e identificação de tartarugas. |
| Reforço | Fraquezas + Oportunidades | Ampliar o dataset de imagens anotadas, realizar novos experimentos e avaliar os resultados para identificar possibilidades de melhoria no reconhecimento. |
| Confronto | Forças + Ameaças | Utilizar a separação entre Front-end e Back-end, a organização das atividades e os testes controlados para reduzir problemas de integração e dependência de serviços externos. |
| Sobrevivência | Fraquezas + Ameaças | Priorizar a estabilidade das funcionalidades existentes e manter melhorias de maior complexidade, especialmente relacionadas à visão computacional, para etapas posteriores. |

---

## 4. Priorização do Backlog – Método MoSCoW

A priorização das atividades foi organizada por meio do método MoSCoW, considerando a importância de cada funcionalidade para os objetivos do projeto.

As atividades são classificadas em quatro categorias:

- **Must Have:** funcionalidades indispensáveis para o funcionamento e os objetivos principais do sistema.
- **Should Have:** funcionalidades importantes que contribuem para a qualidade e a experiência de utilização.
- **Could Have:** melhorias desejáveis que podem ser implementadas conforme a disponibilidade da equipe.
- **Won't Have:** funcionalidades que não serão contempladas no ciclo atual e poderão ser consideradas em etapas futuras.

A classificação é registrada nas Issues dos repositórios Front-end e Back-end, utilizando labels para facilitar a identificação das prioridades.

---

## 5. Planejamento da Sprint Final

### 5.1 Objetivo

Organizar e acompanhar as atividades necessárias para a consolidação do protótipo Tugarin, priorizando as funcionalidades relevantes para a apresentação e avaliação acadêmica do projeto.

### 5.2 Atividades acompanhadas

Durante o planejamento da Sprint Final, foram consideradas as seguintes atividades:

- Ajustar a responsividade da interface para diferentes dispositivos.
- Avaliar o desempenho do modelo de detecção YOLOv11.
- Desenvolver a tela informativa das espécies de tartarugas.
- Revisar os detalhes das ocorrências.
- Aprimorar os filtros de consulta.
- Ampliar o dataset de imagens utilizado nos experimentos de visão computacional.

As atividades foram organizadas e acompanhadas pelo GitHub Projects, considerando os respectivos status, prioridades, esforço estimado e áreas de desenvolvimento.

### 5.3 Acompanhamento

O quadro Kanban foi utilizado para visualizar o andamento das atividades, distribuídas entre os seguintes estados:

- **Todo:** atividades ainda não iniciadas.
- **In Progress:** atividades em desenvolvimento.
- **In Review:** atividades aguardando revisão.
- **Done:** atividades concluídas.

Essa organização permitiu acompanhar o andamento das tarefas e identificar as atividades que ainda necessitavam de atenção.

---

## 6. Definição de Pronto (Definition of Done – DoD)

Para manter um padrão de qualidade durante o desenvolvimento, foram considerados os seguintes critérios para a conclusão das atividades:

- [ ] A funcionalidade atende aos critérios de aceitação definidos na Issue.
- [ ] A implementação está integrada corretamente ao sistema.
- [ ] Os testes necessários foram realizados.
- [ ] Os erros identificados foram corrigidos.
- [ ] A alteração passou por revisão.
- [ ] A Issue correspondente foi atualizada no GitHub Projects.
- [ ] O status da atividade foi atualizado de acordo com seu andamento.

---

## 7. Entrega e Continuidade do Projeto

O protótipo Tugarin foi apresentado para avaliação acadêmica em **03 de novembro de 2026**, marcando a conclusão do ciclo de desenvolvimento e planejamento correspondente à entrega final do projeto.

Após essa etapa, as atividades que permaneceram em aberto continuaram organizadas no GitHub Projects, respeitando seus respectivos estados de desenvolvimento.

As melhorias e novas funcionalidades serão consideradas em etapas posteriores, conforme as necessidades identificadas, a disponibilidade da equipe e o planejamento do próximo semestre.

Dessa forma, o gerenciamento ágil permite preservar o histórico das atividades realizadas e manter uma organização das demandas para a continuidade do projeto.

---

## 8. Ferramentas de Gerenciamento

O gerenciamento das atividades do Tugarin é realizado por meio do GitHub, utilizando os seguintes recursos:

- **GitHub Issues:** registro e descrição das atividades, critérios de aceitação e acompanhamento das tarefas.
- **GitHub Projects:** organização visual do backlog e acompanhamento do fluxo de trabalho por meio do Kanban.
- **Labels:** classificação das atividades por tipo, área de desenvolvimento e prioridade.
- **Milestones:** organização das entregas e dos objetivos associados a determinados períodos.
- **Campos personalizados:** utilização de Sprint, Área, Priority e Effort para complementar o gerenciamento das atividades.

Essas ferramentas contribuem para a organização do desenvolvimento, a distribuição das responsabilidades e o acompanhamento da evolução do Tugarin.
