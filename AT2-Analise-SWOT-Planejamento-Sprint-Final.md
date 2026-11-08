# AT2 – Análise SWOT e Planejamento da Sprint Final

## 1. Contextualização

O Tugarin é um sistema desenvolvido para auxiliar o monitoramento e o registro de ocorrências envolvendo tartarugas marinhas na região de Cananéia, litoral sul do estado de São Paulo.

A aplicação busca centralizar informações relacionadas às ocorrências, permitindo o registro de dados dos animais, imagens e informações de localização, contribuindo para a organização das atividades de monitoramento ambiental.

O desenvolvimento utiliza React e Next.js no Front-end, Node.js e Express no Back-end e MongoDB para armazenamento dos dados. Além disso, o projeto investiga técnicas de visão computacional por meio do modelo YOLOv11, com o objetivo de apoiar a identificação de tartarugas.

O gerenciamento do desenvolvimento é realizado por meio de práticas ágeis, utilizando GitHub Issues e GitHub Projects para organizar as atividades, acompanhar o andamento das tarefas e distribuir responsabilidades entre os integrantes da equipe.

---

## 2. Diagnóstico Situacional – Análise SWOT

A análise SWOT foi utilizada para identificar os fatores internos e externos que influenciam o desenvolvimento do Tugarin, permitindo reconhecer pontos positivos, dificuldades e oportunidades de evolução.

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

As estratégias definidas orientam a priorização das atividades, considerando as necessidades atuais do protótipo e as possibilidades de continuidade do desenvolvimento.

---

## 4. Priorização do Backlog – Método MoSCoW

A priorização das atividades foi organizada por meio do método MoSCoW, considerando a importância de cada funcionalidade para os objetivos do projeto.

As atividades são classificadas em quatro categorias:

- **Must Have:** funcionalidades indispensáveis para o funcionamento e os objetivos principais do sistema.
- **Should Have:** funcionalidades importantes que contribuem para a qualidade e a experiência de utilização.
- **Could Have:** melhorias desejáveis que podem ser implementadas conforme a disponibilidade da equipe.
- **Won't Have:** funcionalidades que não serão contempladas no ciclo atual e poderão ser consideradas em etapas futuras.

A classificação é registrada nas Issues dos repositórios Front-end e Back-end, utilizando labels para facilitar a identificação das prioridades.

### 4.1 Classificação das atividades do backlog

Com base nas Issues registradas nos repositórios do Tugarin, as atividades acompanhadas na Sprint Final apresentam a seguinte classificação:

| Repositório | Issue | Atividade | MoSCoW |
|---|---|---|---|
| Front-end | #7 | Ajustar responsividade da interface para dispositivos móveis | Must Have |
| Front-end | #8 | Implementar filtros de consulta de ocorrências | Should Have |
| Back-end | #10 | Avaliar desempenho do modelo de detecção | Should Have |
| Front-end | #5 | Desenvolver tela informativa sobre as espécies de tartarugas | Could Have |
| Back-end | #8 | Ampliar dataset de imagens YOLOv11 | Could Have |

A classificação considera as labels de prioridade MoSCoW registradas nas respectivas Issues.

É importante diferenciar a classificação MoSCoW do campo Priority utilizado no GitHub Projects. Enquanto MoSCoW indica a importância da funcionalidade para o escopo do projeto, Priority permite identificar o nível de urgência de cada atividade.

Não foram identificadas, no conjunto de Issues apresentado, funcionalidades formalmente classificadas como Won't Have. Essa categoria permanece disponível para registrar decisões de adiamento de escopo quando necessário.

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

### 5.3 Organização do fluxo de trabalho

O quadro Kanban foi utilizado para visualizar o andamento das atividades, distribuídas entre os seguintes estados:

- **Todo:** atividades ainda não iniciadas.
- **In Progress:** atividades em desenvolvimento.
- **In Review:** atividades que aguardam revisão.
- **Done:** atividades concluídas.

Essa organização permitiu acompanhar o andamento das tarefas, identificar atividades pendentes e visualizar o progresso do desenvolvimento.

### 5.4 Situação das atividades no acompanhamento

No acompanhamento registrado no GitHub Projects, foram identificadas as seguintes situações:

| Issue | Atividade | Status registrado |
|---|---|---|
| Front-end #4 | Desenvolver tela de detalhes das ocorrências | Done |
| Front-end #5 | Desenvolver tela informativa sobre as espécies | Todo |
| Front-end #7 | Ajustar responsividade da interface | In Progress |
| Front-end #8 | Implementar filtros de consulta | In Review |
| Back-end #8 | Ampliar dataset de imagens YOLOv11 | In Progress |
| Back-end #10 | Avaliar desempenho do modelo | In Progress |

Os estados apresentados representam o acompanhamento realizado no momento do registro do quadro e não significam que todas as atividades tenham sido finalizadas com a entrega acadêmica.

---

## 6. Alinhamento de Escopo e Decisões de Planejamento

O planejamento da Sprint Final considerou as funcionalidades desenvolvidas, as necessidades identificadas durante os testes e o objetivo de apresentar o protótipo Tugarin para avaliação acadêmica.

A equipe priorizou a consolidação das funcionalidades existentes, a organização das ocorrências e a investigação de visão computacional.

### 6.1 Direcionamento do escopo

Foram considerados como pontos centrais do desenvolvimento:

- Organização e consulta das ocorrências registradas.
- Apresentação das informações relacionadas às tartarugas.
- Navegação entre as telas da aplicação.
- Adaptação da interface para diferentes dispositivos.
- Continuidade dos experimentos de reconhecimento utilizando YOLOv11.

### 6.2 Funcionalidades e melhorias posteriores

As atividades que não foram concluídas durante o ciclo de desenvolvimento permaneceram registradas no backlog, permitindo sua continuidade em etapas posteriores.

Entre os pontos que demandam evolução estão:

- Ampliação do conjunto de imagens anotadas para o treinamento do YOLOv11.
- Realização de novos treinamentos e avaliações do modelo.
- Aprimoramento da precisão da detecção.
- Continuidade dos ajustes de responsividade.
- Implementação e validação de funcionalidades ainda pendentes.

A definição de novas atividades será realizada conforme as necessidades identificadas e o planejamento da equipe para o próximo semestre.

---

## 7. Definição de Pronto (Definition of Done – DoD)

Para manter um padrão de qualidade durante o desenvolvimento, foram considerados os seguintes critérios para a conclusão das atividades:

- [ ] A funcionalidade atende aos critérios de aceitação definidos na Issue.
- [ ] A implementação está integrada corretamente ao sistema.
- [ ] Os testes necessários foram realizados.
- [ ] Os erros identificados foram corrigidos.
- [ ] A alteração passou por revisão.
- [ ] A Issue correspondente foi atualizada no GitHub Projects.
- [ ] O status da atividade foi atualizado de acordo com seu andamento.

A Definition of Done estabelece critérios mínimos para considerar uma atividade concluída, contribuindo para a qualidade e a organização das entregas.

---

## 8. Entrega e Continuidade do Projeto

O protótipo Tugarin foi apresentado para avaliação acadêmica em **03 de novembro de 2026**, marcando a entrega do projeto para avaliação.

Essa entrega representou o encerramento do ciclo de apresentação acadêmica, mas não necessariamente a conclusão de todas as funcionalidades e melhorias previstas para o sistema.

Após a apresentação, as atividades que permaneceram em aberto continuaram organizadas no GitHub Projects, respeitando seus respectivos estados de desenvolvimento.

As melhorias e novas funcionalidades serão consideradas em etapas posteriores, conforme as necessidades identificadas, a disponibilidade da equipe e o planejamento do próximo semestre.

As atividades referentes ao próximo semestre ainda não foram detalhadas em novas Issues, uma vez que essa organização será realizada no início do próximo período acadêmico.

Dessa forma, o gerenciamento ágil permite preservar o histórico das atividades realizadas e manter uma organização das demandas para a continuidade do projeto.

---

## 9. Ferramentas de Gerenciamento

O gerenciamento das atividades do Tugarin é realizado por meio do GitHub, utilizando os seguintes recursos:

- **GitHub Issues:** registro e descrição das atividades, critérios de aceitação e acompanhamento das tarefas.
- **GitHub Projects:** organização visual do backlog e acompanhamento do fluxo de trabalho por meio do Kanban.
- **Labels:** classificação das atividades por tipo, área de desenvolvimento e prioridade.
- **Milestones:** organização das entregas e dos objetivos associados a determinados períodos.
- **Campos personalizados:** utilização de Sprint, Área, Priority e Effort para complementar o gerenciamento das atividades.

Essas ferramentas contribuem para a organização do desenvolvimento, a distribuição das responsabilidades e o acompanhamento da evolução do Tugarin.

### 9.1 Evidências do gerenciamento

O acompanhamento do projeto pode ser verificado por meio dos registros disponíveis no GitHub:

- Quadro Kanban do projeto Tugarin, contendo as atividades organizadas por status.
- Issues dos repositórios Front-end e Back-end, contendo descrições e critérios de aceitação.
- Labels utilizadas para classificação e priorização das atividades.
- Campos personalizados de Sprint, Área, Priority e Effort.
- Histórico de alterações e atualizações das Issues.
- Documento de análise SWOT e planejamento da Sprint Final publicado no repositório Front-end.

Esses registros permitem acompanhar as decisões de planejamento e a evolução das atividades durante o desenvolvimento do Tugarin.
