<div align="center" class = "all" >
  <h1>
      Relatório do problema 3: BET Distribuída
  </h1>

  <h3>
    Mailson Alves Silva Santos<sup>1</sup>, Matheus Mota Santos<sup>2</sup>
  
  </h3>


  <p>
    Engenharia de Computação – Universidade Estadual de Feira de Santana (UEFS)
    Av. Transnordestina, s/n, Novo Horizonte
    Feira de Santana – BA, Brasil – 44036-900
  </p>

  <center>mailsonalves.new@gmail.com<sup>1</sup></center>
  <center>matheuzwork@gmail.com<sup>2</sup></center>

</div>

#  Introdução
Com a evolução tecnológica e a disseminação dos dispositivos conectados à internet, o mercado de apostas online tem registrado um crescimento acelerado nos últimos anos. Esse avanço é impulsionado pela acessibilidade proporcionada pelos smartphones e pela popularização crescente das plataformas de apostas online. Paralelamente, o volume financeiro movimentado por esse setor, avaliado em bilhões de reais, tem despertado o interesse de governos em diversos países, incluindo o Brasil, que atualmente discute formas de regulamentar e tributar essa atividade.
Diante desse cenário, surge a possibilidade de desenvolver sistemas inovadores que atendam às expectativas de usuários em busca de maior liberdade, transparência e autonomia. Este relatório apresenta a concepção de um sistema descentralizado de apostas, uma solução que elimina intermediários e oferece uma experiência resistente a bloqueios regulatórios, promovendo mais independência aos participantes.
O sistema proposto busca atender a requisitos essenciais, como a realização de apostas em eventos simulados em tempo real, o gerenciamento de créditos dos usuários por meio de depósitos e saques, e a garantia de transparência com resultados acessíveis publicamente. A interface será projetada para ser intuitiva, permitindo o cadastro de eventos e jogos, bem como a consulta de resultados, sempre em conformidade com as restrições aplicáveis.
Este documento detalha os objetivos e funcionalidades do sistema, destacando como ele atende às demandas do mercado e, ao mesmo tempo, observa as regulamentações e limitações vigentes.

# Fundamentação Teórica 

O desenvolvimento de um sistema descentralizado de apostas online exige uma base teórica sólida, fundamentada em tecnologias como blockchain, contratos inteligentes e ferramentas de integração. Este documento apresenta como essas tecnologias são aplicadas, além de descrever os benefícios e a implementação prática do projeto.

<h3>
  Blockchain e Descentralização
</h3>
A tecnologia blockchain, com seu sistema de registro distribuído, é a base para garantir transparência, segurança e imutabilidade no armazenamento de dados. Em vez de depender de uma autoridade central, os dados são registrados em blocos interligados por hashes criptográficos, dificultando alterações sem o consenso da rede.
No sistema de apostas proposto, a blockchain permite o registro seguro de transações, apostas e resultados, tornando todas as operações auditáveis. Essa estrutura elimina a necessidade de intermediários, conferindo mais liberdade aos usuários e permitindo que participem diretamente das apostas, sem intervenção de casas tradicionais.

<h3>Contratos Inteligentes e Automação</h3>
Os contratos inteligentes são peças centrais desse sistema. Desenvolvidos em Solidity, eles automatizam as regras das apostas e gerenciam transações de forma segura e transparente. Esses contratos permitem:

<li>Registrar eventos e condições das apostas</li>
<li>Gerenciar créditos e realizar a distribuição automática de prêmios com base nos resultados</li>
<li>Garantir a execução das regras previamente estabelecidas, sem intervenção externa.</li>

Através dos contratos inteligentes, o sistema realiza depósitos, saques e distribuições de prêmios diretamente na blockchain, proporcionando eficiência e confiabilidade.


<h3>
  Ferramentas de Desenvolvimento: Ganache e Solidity
</h3>
Para o desenvolvimento e teste dos contratos inteligentes, a ferramenta Ganache será utilizada, simulando uma blockchain local. Essa abordagem permite:

<li>Testar transações sem custos.</li>
<li>Simular cenários de uso real, como movimentação de créditos e validação de apostas</li>
<li>Monitorar o comportamento do sistema em um ambiente controlado antes da implementação em redes públicas</li>

<h3>Interface com React e Integração com Blockchain</h3>
A interface do sistema será construída utilizando React, garantindo uma experiência dinâmica e intuitiva. A integração com a blockchain será realizada por meio de bibliotecas como Web3.js, que permitem:
Enviar e monitorar transações diretamente da interface.
Consultar dados armazenados nos contratos inteligentes, como resultados de apostas e saldos.
Exibir informações em tempo real, como eventos simulados, odds e prêmios distribuídos.
Essa combinação de ferramentas assegura uma comunicação fluida entre o usuário e a blockchain, permitindo interações simples e seguras.

<h3>Benefícios do Sistema Descentralizado</h3>
A proposta de um sistema descentralizado de apostas apresenta vantagens significativas em relação aos modelos tradicionais:
<li>Eliminação de Intermediários: Reduz custos e complexidade operacional, conectando diretamente os participantes.</li>
<li>Transparência e Segurança: A imutabilidade da blockchain protege contra manipulações, e os registros públicos garantem a confiança no sistema.</li>
<li>Acessibilidade e Autonomia: Usuários podem participar globalmente, com controle total sobre suas apostas e créditos.</li>
<li>Esse sistema não apenas atende às demandas de usuários modernos por liberdade e transparência, mas também apresenta uma solução robusta e inovadora alinhada àstendências tecnológicas atuais.</li>

# Metodologia

Nesta seção, detalhamos as etapas, ferramentas e abordagens utilizadas no desenvolvimento do sistema descentralizado de apostas online. A metodologia adotada foi estruturada para atender aos requisitos fundamentais de descentralização, segurança e transparência, além de garantir uma experiência do usuário eficiente e confiável em um ambiente blockchain.

<h3> Configurando o Ambiente de Desenvolvimento </h3>
Para assegurar organização e produtividade, o ambiente de desenvolvimento foi estruturado com as seguintes ferramentas:

<li> Visual Studio Code (VS Code): Selecionado como a IDE principal devido à sua compatibilidade com diversas linguagens e extensões, como aquelas voltadas para Solidity e React. Recursos como depuração avançada e integração com controle de versão contribuíram significativamente para otimizar o processo de desenvolvimento.</li>

<li>Ganache:  Essa ferramenta permitiu o teste de contratos inteligentes em um ambiente seguro e isolado, acelerando o ciclo de desenvolvimento e garantindo consistência nas simulações.</li>

<li>Node.js: Essencial para gerenciar pacotes e dependências do projeto, além de executar scripts relacionados ao desenvolvimento e à integração das funcionalidades.</li>

<li>truffle</li>
<h3> Criação dos Contratos Inteligentes </h3>
Utilizamos a linguagem Solidity para o desenvolvimento dos contratos inteligentes, ela é muito utilizada para o blockchain Ethereum.  A ideia seria projetar  e implementar funções para registro de eventos e odds nos quais Desenvolvemos funções que criavam os contratos de registro de eventos e odds para as apostas. O usuário poderia criar um evento/aposta assim que criasse sua conta e tivesse fundos para criação da aposta. Além disso foram feitas funções para o Gerenciamento de apostas e fundos em que o sistema controla as apostas realizadas pelos usuários, armazenando os valores de forma descentralizada e funções de Distribuição de prêmios onde os contratos garantem uma distribuição justa e transparente dos prêmios aos vencedores.

<h3> Integrando com a Blockchain </h3>
A integração entre a aplicação e os contratos inteligentes foi realizada com a biblioteca Web3.js. Utilizamos essa biblioteca pois ela desempenha um papel de comunicação entre o front-end da aplicação e os contratos inteligentes que seriam gerados. Essa integração permitiu que:
<li>Envio de transações assinadas, garantindo autenticidade.</li>
<li>Consulta a dados armazenados na blockchain.</li>
<li>Monitoração em tempo real dos eventos registrados nos contratos.</li>

<h3>  Ferramentas e Tecnologias Utilizadas </h3>
Fazendo um resumo das ferramentas e tecnologias utilizadas como base:
<li>Visual Studio Code: Suporte abrangente para Solidity, JavaScript e extensões necessárias.</li>
<li>Solidity: Linguagem padrão para contratos inteligentes na Ethereum, reconhecida por sua eficiência e suporte à segurança.</li>
<li>Ganache: Ferramenta essencial para simulação de blockchain local, otimizando o ciclo de desenvolvimento.</li>
<li>Web3.js: Biblioteca confiável para integração entre o front-end e a blockchain, garantindo consistência nos dados.</li>
<li>React: Proporcionou uma interface moderna, responsiva e intuitiva, essencial para o engajamento do usuário.</li>
<li>Node.js: Facilitou a execução e o gerenciamento de scripts.</li>

# Resultados Esperados
O sistema de apostas online descentralizado foi desenvolvido com o objetivo de apresentar uma solução inovadora e eficiente, baseada na tecnologia blockchain, para atender aos requisitos essenciais de descentralização, segurança e transparência. A seguir, destacamos os principais pilares e os resultados esperados do projeto.

<h3>Garantia de Transparência e Confiança</h3>

A implementação de contratos inteligentes permite que todas as regras e condições das apostas sejam registradas de forma imutável na blockchain. Essa característica garante que qualquer usuário possa auditar os registros de eventos, apostas realizadas e distribuição de prêmios, eliminando a necessidade de confiança em intermediários. A transparência absoluta promove credibilidade e confiança na plataforma, uma vez que todas as operações são verificáveis publicamente.

<h3>Segurança e Integridade dos Dados</h3>

Os dados do sistema, como informações sobre apostas, eventos e prêmios, são armazenados de maneira descentralizada na blockchain, o que os torna resistentes a alterações maliciosas e falhas. Essa estrutura garante a integridade das informações e a proteção contra manipulações ou perdas, proporcionando um ambiente seguro e confiável para os usuários.

<h3>Sistema Descentralizado e Acessível</h3>

Ao eliminar a dependência de servidores centralizados, o sistema reduz significativamente os riscos de falhas técnicas, censura ou manipulação de resultados. A descentralização também garante a acessibilidade global, permitindo que usuários em qualquer local do mundo possam acessar a plataforma e realizar suas apostas sem restrições, desde que possuam uma conexão com a internet.

<h3>Experiência do Usuário Intuitiva e Funcional</h3>

A plataforma foi projetada para oferecer uma interface responsiva, intuitiva e amigável, facilitando a experiência do usuário, mesmo para aqueles com pouca familiaridade com tecnologia blockchain. A aplicação permitirá que os usuários realizem apostas de forma simples, acompanhem seus saldos em tempo real e consultem históricos de eventos e transações diretamente na blockchain. Além disso, atualizações dinâmicas e feedbacks visuais claros garantem uma navegação fluida e eficiente.

<h3>Validação e Testes Rigorosos</h3>
Antes da implantação em uma blockchain pública ou privada, o sistema será submetido a testes em um ambiente de simulação, utilizando ferramentas como Ganache. Essa etapa é crucial para garantir a consistência dos resultados e a detecção de possíveis falhas nos contratos inteligentes ou na integração com o front-end. A validação em ambiente controlado assegura que a plataforma funcione conforme o esperado em produção.

<h3>Escalabilidade e Adaptação</h3>
A arquitetura modular do sistema foi projetada para suportar um número crescente de usuários e eventos sem comprometer o desempenho da plataforma. Além disso, a estrutura permite adaptações futuras, como a adição de novas funcionalidades ou a integração com outras blockchains. Essa flexibilidade possibilita a evolução contínua do sistema, alinhando-o às demandas do mercado e às novas tecnologias emergentes.

# Conclusão
O desenvolvimento do sistema de apostas online descentralizado evidencia o potencial da tecnologia blockchain em revolucionar a concepção e oferta de serviços digitais. Com o uso de ferramentas como Solidity, Web3.js e Ganache, foi possível atender aos requisitos de descentralização, segurança, transparência e eficiência exigidos pelo projeto. Os resultados obtidos ressaltam os benefícios da blockchain para sistemas de apostas online e comprovam a confiabilidade da solução implementada, tornando o sistema apto e seguro para utilização.
