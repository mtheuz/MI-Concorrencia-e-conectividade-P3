pragma solidity ^0.8.0;

// Contrato para apostas em eventos com resultados variados.
contract Betting {
    // Estrutura que define um evento de apostas.
    struct Event {
        string description; // Descrição do evento.
        string[] outcomes; // Lista de possíveis resultados do evento.
        uint[] odds; // Probabilidades associadas a cada resultado (em escala ajustada por ether).
        uint totalBetAmount; // Valor total apostado no evento.
        bool isClosed; // Indica se o evento foi encerrado.
        uint winningOutcome; // Resultado vencedor do evento.
        mapping(address => uint) bets; // Mapeamento de apostas dos usuários, vinculado ao endereço deles.
    }

    mapping(uint => Event) public events; // Mapeamento de eventos, indexado por um ID único.
    uint public eventCount; // Contador de eventos criados.

    /**
     * @notice Cria um novo evento de apostas.
     * @param _description Descrição do evento.
     * @param _outcomes Lista de possíveis resultados.
     * @param _odds Lista de probabilidades correspondentes aos resultados.
     */
    function createEvent(
        string memory _description,
        string[] memory _outcomes,
        uint[] memory _odds
    ) public {
        // Validação: o número de resultados deve ser igual ao número de probabilidades.
        require(_outcomes.length == _odds.length, "Outcomes and odds mismatch");

        // Inicialização de um novo evento no armazenamento.
        Event storage newEvent = events[eventCount++];
        newEvent.description = _description;
        newEvent.outcomes = _outcomes;
        newEvent.odds = _odds;
        newEvent.totalBetAmount = 0; // Nenhuma aposta feita inicialmente.
        newEvent.isClosed = false; // O evento começa aberto para apostas.
        newEvent.winningOutcome = 0; // Nenhum resultado vencedor definido inicialmente.
    }

    /**
     * @notice Permite que um usuário faça uma aposta em um determinado resultado.
     * @param _eventId ID do evento no qual a aposta será feita.
     * @param _outcome Índice do resultado escolhido para a aposta.
     */
    function placeBet(uint _eventId, uint _outcome) public payable {
        Event storage bettingEvent = events[_eventId];
        // Validação: o evento deve estar aberto para apostas.
        require(!bettingEvent.isClosed, "Event is closed");
        // Validação: o resultado escolhido deve ser válido.
        require(_outcome < bettingEvent.outcomes.length, "Invalid outcome");

        // Armazena o valor apostado pelo usuário no evento.
        bettingEvent.bets[msg.sender] += msg.value;
        // Incrementa o valor total apostado no evento.
        bettingEvent.totalBetAmount += msg.value;
    }

    /**
     * @notice Encerra o evento e define o resultado vencedor.
     * @param _eventId ID do evento a ser encerrado.
     * @param _winningOutcome Índice do resultado vencedor.
     */
    function closeEvent(uint _eventId, uint _winningOutcome) public {
        Event storage bettingEvent = events[_eventId];
        // Validação: o evento não deve estar encerrado.
        require(!bettingEvent.isClosed, "Event already closed");

        // Marca o evento como encerrado e define o resultado vencedor.
        bettingEvent.isClosed = true;
        bettingEvent.winningOutcome = _winningOutcome;
    }

    /**
     * @notice Permite que um usuário resgate seus ganhos após o encerramento do evento.
     * @param _eventId ID do evento em que os ganhos serão resgatados.
     */
    function claimWinnings(uint _eventId) public {
        Event storage bettingEvent = events[_eventId];
        // Validação: o evento deve estar encerrado.
        require(bettingEvent.isClosed, "Event is not closed yet");
        // Validação: o resultado vencedor deve ser válido.
        require(bettingEvent.winningOutcome < bettingEvent.outcomes.length, "Invalid outcome");

        // Calcula o valor apostado pelo usuário.
        uint userBet = bettingEvent.bets[msg.sender];
        // Calcula os ganhos do usuário com base na probabilidade do resultado vencedor.
        uint userWinnings = (userBet * bettingEvent.odds[bettingEvent.winningOutcome]) / 1 ether;

        // Validação: o usuário deve ter ganhos a receber.
        require(userWinnings > 0, "No winnings to claim");

        // Zera a aposta do usuário para evitar duplicidade.
        bettingEvent.bets[msg.sender] = 0;
        // Transfere os ganhos para o usuário.
        payable(msg.sender).transfer(userWinnings);
    }
}
