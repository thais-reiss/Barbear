# BarBear

Alice Guanaes Albuquerque Martins, agamartins@sga.pucminas.br

Bárbara Kawany Gonçalves Nunes Carvalho, barbara.carvalho.1484211@sga.pucminas.br

Igor Fernandes Camargos de Lima, ifclima@sga.pucminas.br

Thaís dos Reis Soares, thais.reis@sga.pucminas.br

Túlio Henrique Martins Gonçalves, thmgoncalves@sga.pucminas.br

---

Professores:

Eveline Alonso Veloso

Joana Gabriela Ribeiro de Souza

Juliana Amaral Baroni de Carvalho

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

**Resumo:**

Este projeto refere-se ao desenvolvimento de um software para agendamento de serviços de barbearia, com o objetivo de trazer praticidade e conveniência a quem deseja agendar um serviço deste tipo, uma vez que esta tarefa pode ser feita on-line. Ao mesmo tempo, o projeto visa gerar valor também às barbearias, eliminando alguns trabalhos manuais, aumentando seu alcance e  facilitando a conexão desses estabelecimentos e seus clientes.

Sendo assim, o resultado mais relevante deste projeto é o aprendizado que cada um dos membros teve com o desenvolvivento do sistema, que proporcionou compreender as diversas partes que compõem um software e como se dá o processo de construção deste.

---

## 1. Introdução

O projeto "BarBear" é uma iniciativa que visa criar uma plataforma digital dedicada ao agendamento de serviços de barbearia. Inspirado no sucesso de aplicativos de transporte como o Uber, o BarBear busca facilitar a conexão entre clientes e barbearias, oferecendo uma experiência de agendamento prática, eficiente e acessível. Com a digitalização cada vez mais presente em diversos setores, o BarBear pretende modernizar a maneira como os serviços de barbearia são contratados, oferecendo aos usuários conveniência e qualidade em suas interações com estabelecimentos especializados.

### 1.1 Contextualização

O avanço tecnológico tem transformado diversos setores, incluindo o de serviços, onde a conveniência proporcionada por aplicativos como o iFood redefine a experiência do consumidor. No Brasil, o mercado de beleza, que movimentou R$ 122 bilhões em 2022 segundo a ABIHPEC **[1.1]**, também busca por inovações digitais. O BarBear se insere nesse contexto, oferecendo uma plataforma específica para agendamento de serviços de barbearia, conectando clientes a barbearias de forma prática e eficiente, preenchendo uma lacuna no mercado de beleza ao trazer conveniência e qualidade no atendimento.

### 1.2 Problema

O problema que o BarBear busca resolver é a otimização do tempo dos homens. Já que, com a vida acelerada, principalmente em cidades grandes, muitos homens enfrentam a dificuldade de encontrar barbearias que ofereçam os serviços que desejam próximas à sua residência. Além dos inconvenientes de terem que esperar em filas ou demorar a ser atendido ao telefone para agendar horários.

### 1.3 Objetivo geral

O objetivo geral é desenvolver um sistema que automatize o agendamento de serviços em barbearias, proporcionando praticidade aos clientes ao permitir que localizem estabelecimentos, escolham serviços e realizem pagamentos de forma simples e online.

#### 1.3.1 Objetivos específicos

1- Desenvolver e implementar uma interface de usuário que permita aos clientes agendar serviços de barbearia com facilidade, garantindo uma simples navegação e uma experiência de usuário positiva.

2- Permitir avaliação e feedback para os serviços prestados, que permita aos clientes avaliar suas experiências e fornecer feedbacks, ajudando as barbearias a melhorar a qualidade do serviços prestados.

3- Permitir que barbearias e salões gerenciem seus dados pessoais, como endereço, telefone, cnpj e outros, mantendo-os sempre atualizados.

4- Permitir que a barbearia gerencie os serviços prestados por ela, como preço, descrição, tipo e outros.

5- Implementar um cadastro de clientes, permitindo o gerenciamento de perfil, histórico de agendamentos e feedbacks.

### 1.4 Justificativas

Optamos pela criação do BarBear com o objetivo de atender homens que enfrentam dificuldades na escolha do barbeiro ideal ou na seleção de um serviço de qualidade. Nosso foco é proporcionar segurança e confiança aos clientes, garantindo que não corram o risco de comprometer sua autoestima e economizem tempo no processo não precisando passar pelas filas e preparo do barbeiro, que já estará esperando o cliente.

## 2. Participantes do processo

Clientes das barbearias:

• Idade: 16-40 anos.

• Gênero: Predominantemente masculino, mas pode incluir mulheres que frequentam salões de beleza.

• Comportamento: Frequentadores regulares de barbearias e salões.
Procuram serviços de qualidade e com bom custo-benefício.
Confiam em avaliações e opiniões online para tomar decisões.

• Localização: Urbanos, vivendo em áreas metropolitanas ou grandes cidades onde a variedade de barbearias é maior.

Gestor das barbearias:

• O responsável por administrar as operações diárias das barbearias como: agendamento de clientes, otimiza o atendimento, coordena a equipe, mantem a manutenção de recursos entre outros.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

Para encontrar barbearias, os homens realizam processos que podem ou não envolver ferramentas digitais. Por exemplo, pode ser pela recomendação de amigos ou simplesmente ao se deparar com as barbearias ao se locomover pela sua cidade.
Com o uso de ferramentas digitais, eles precisam pesquisar e entrar no site de cada uma delas para encontrar mais informações, como os serviços, o endereço e o telefone. Além disso, para realizar agendamentos, é necessário telefonar para as barbearias ou ir presencialmente até o local.

Normalmente, esses estabelecimentos realizam o gerenciamento dos serviços ofertados de modo manual. Muitos deles utilizam de redes sociais (como WhatsApp e Instagram) para divulgarem os tipos de serviços que ofertam, seja por meio de imagens ou textos, tendo que atualizarem manualmente quando algum serviço é alterado.

Apesar de existirem algumas plataformas de gestão de barbearias, elas são pouco conhecidas e, por isso, pouco usadas. Assim, o mais comum é que as barbearias cadastrem seu negócio no Google Meu Negócio ou em redes sociais. Para isso, fornecem informações do negócio, como nome, endereço do estabelecimento, fotos, meio de contato e horário de funcionamento, principalmente.

Assim, o processo de avaliação dos serviços também ocorre por esses meios. No Google, é comum as pessoas que possuem uma conta nessa plataforma pesquisarem pelo estabelecimento desejado e visualizarem o nome dele, informações do endereço, geralmente tem número de contato, horário de funcionamento e fotos. Com isso, existe uma seção de "Avaliação", em que são exibidos os comentários feitos por outros usuários sobre o local, sendo possível inserir uma nova avaliação com um número de estrelas (que vai de 1 a 5) e escrever um comentário falando sobre a empresa. E ainda, se quiser, há como adicionar à avaliação fotos e vídeos.

Já o processo de cadastro de usuários é feito de forma que o funcionário cadastra, num sistema de gestão digital ou em cadernos, dados dos clientes, como nome, CPF e número de telefone. Para isso, o cliente deve ir presencialmente ou informar seus dados via rede social ou ligação telefônica.

Portanto, com ou sem o uso de ferramentas digitais, os processos realizados para funcionamento das barbearias são bastante manuais, pois não há um sistema que facilite a conexão entre os clientes e os estabelecimentos. É nesse contexto que o sistema BarBear é um grande aliado, já que servirá como uma ponte que conecta as barbearias com seus possíveis clientes de maneira virtual, eliminando alguns dos antigos inconvenientes. O BarBear permitirá aos usuários encontrarem barbearias em sua região, se informarem sobre elas e realizarem agendamentos em um só lugar.

### 3.2. Descrição geral da proposta de solução

O BarBear visa transformar o agendamento de serviços em barbearias através de uma plataforma digital intuitiva e eficiente automatizando os processos tanto para o cliente quanto para o gerente. Por meio de um gerenciamento de serviços vamos deixar o gerente da barbearia com liberdade total e controle do estabelecimento, fazendo com que tenha controle total sobre tudo. Apoiando novos empreendedores damos a liberdade de cadastrar sua nova barbearia por meio do nosso gerenciamento de barbearia com muita facilidade. Todos nós gostamos de um bom corte e principalmente o barbeiro e o estabelecimento, que com o nosso sistema de avaliação torna isso capaz, por meio do seu pedido você tem a liberdade de avaliar como foi sua experiência e resultado com o serviço. Como toda plataforma amamos novas pessoas e na BarBear isso não é diferente, visamos dar toda a liberdade e apoio a novos usuários, com um mecanismo de cadastro completo encorajamos o usuário a se cadastrar e explorar a plataforma.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Gerenciamento de serviços](processo-1-Gerenciamento-de-serviços.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Avaliação de Barbearias](processo-2-Avaliação-de-Barbearias.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Agendamento](processo-3-Agendamento.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Gerenciamento de Barbearias](processo-4-Gerenciamento-de-barbearia.md "Detalhamento do Processo 4.")

[PROCESSO 5 - Gerenciamento de Clientes](processo-5-Gerenciamento-de-Clientes.md "Detalhamento do Processo 5.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](Modelo-de-dados.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")

## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)

## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

Ao longo do período no curso de Engenharia de Software desenvolvemos o projeto BarBear, um software que visa proporcionar praticidade e conveniência a quem deseja agendar um serviço em barbearias, além de facilitar a conexão entre elas e seus clientes. 

Assim, por meio deste projeto, fizemos modelagens BPMN dos processos, desenvolvimento back-end e front-end, e desenvolvimento do banco de dados. Para isso, tivemos que aprender desde tecnologias novas à métodos de desenvolvimento em que não possuíamos habilidades práticas anteriormente.

Usamos diversas tecnologias e linguagens de programação, podendo ser citado o Javascript e as tecnologias HTML e CSS para criar as interfaces e torná-las funcionais; Java com uso de SpringBoot para concretizar o back-end; e a linguagem SQL para criar o banco de dados no sistema gerenciador PostgreSQL. Também usamos a metodologia ágil Scrum, que possibilitou uma melhor organização do processo de desenvolvimento do sistema, focando em entregas funcionais em curto espaço de tempo.

No decorrer do projeto tivemos muitos desafios, mas conseguimos lidar bem com eles e aprender bastante sobre trabalho em equipe. De forma geral, todos os integrantes concordam que é muito gratificante e motivador ver algo construído por nós mesmos que funciona! Como resultado, apresentamos um software funcional que atende às necessidades dos clientes, agregando valor, que era nosso principal objetivo.

Podemos destacar como possíveis melhorias futuras: implementação da funcionalidade de filtragem de barbearias que estejam mais próximas da localização do cliente; permitir que as barbearias e os clientes adicionem foto de perfil, gerando mais credibilidade e confiança; e implementação de um sistema de chat para troca de mensagens entre a barbearia e o cliente.

# REFERÊNCIAS

**[1.1]** - _**ASSOCIAÇÃO BRASILEIRA DA INDÚSTRIA DE HIGIENE PESSOAL, PERFUMARIA E COSMÉTICOS (ABIHPEC)**. Panorama do Setor de Higiene Pessoal, Perfumaria e Cosméticos. Relatório de Mercado, 2022. Disponível em: https://www.abihpec.org.br/. Acesso em: 19 ago. 2024._

# APÊNDICES

## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/main) -- repositório do código do back-end

## Apêndice B - Apresentação final

[Slides da apresentação final](presentations/)

[Vídeo da apresentação final](video/)
