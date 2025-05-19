let idCliente = localStorage.getItem("clienteId");

async function fetchServices() {
  try {
    const response = await fetch("http://localhost:8080/agendamentos");
    if (!response.ok) throw new Error("Erro na requisição");

    const agendamentos = await response.json();
    displayServices(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar os agendamentos:", error);
  }
}

function displayServices(agendamentos) {
  const container = document.getElementById("agendamentos");
  container.innerHTML = "";


  agendamentos.forEach(async (agendamento) => {
    if (String(idCliente) === String(agendamento.cliente.idCliente))  {

      const response = await fetch(`http://localhost:8080/barbearia/${agendamento.barbearia.idBarbearia}`);
    if (!response.ok) throw new Error("Erro na requisição");

    const barbearia = await response.json();
    let nomeBarbearia = barbearia.nomeBarbearia;

      const dataAgendamento = agendamento.dataAgendamento;
      const horarioAgendamento = agendamento.horarioAgendamento;

      const padZero = (num) => num.toString().padStart(2, '0');

      const dataFormatada = `${padZero(dataAgendamento[2])}/${padZero(dataAgendamento[1])}/${dataAgendamento[0]}`;
      const horarioFormatado = `${padZero(horarioAgendamento[0])}:${padZero(horarioAgendamento[1])}`;


      const card = document.createElement("div");
      card.classList.add("product-card");
      card.id = "services-container";

      card.innerHTML = `
       
      <div class="logo-cart">
        <img src="../../../../docs/images/logoBarBear2.png" alt="Logo da barbearia" />
        <i class="bx bx-shopping-bag"></i>
      </div>
      <div class="main-images">
        <img class="cabelo" src="${agendamento.servico.imagemServico}" alt="cabelo" />
      </div>

      <div class="detalhes-corte">
        <span class="corte_name">${agendamento.servico.nomeServico}</span>
        <p>
         <span style="color: orange;"> Barbearia: </span> ${nomeBarbearia} <br>
         <span style="color: orange;"> Data: </span>  ${dataFormatada} <br>
         <span style="color: orange;"> Horário: </span>  ${horarioFormatado} <br>
         <span style="color: orange;"> Descrição: </span> ${agendamento.descricaoAgendamento} <br>
        </p>
      </div>
      <button class="botao alterarServicoBtn">Alterar Agendamento</button>
       <button class="botao excluirServicoBtn">Cancelar Agendamento</button>
        <button id="btnMostrar" popovertarget="popup" class="butao avaliarAgendamentoBtn">Avaliar</button>
      `;

      const alterarBtn = card.querySelector(".alterarServicoBtn");
      alterarBtn.addEventListener("click", () => {
        window.location.href = `../Alterar agendamento/alterarAgendamento.html?id=${agendamento.idAgendamento}`;
      });

      const excluirBtn = card.querySelector(".excluirServicoBtn");
      excluirBtn.addEventListener("click", () => excluirAgendamento(agendamento.idAgendamento));

      const avaliarBtn = card.querySelector(".avaliarAgendamentoBtn");
      avaliarBtn.addEventListener("click", () => {
        window.location.href = `../../Gerenciamento de clientes/Historico de agendamentos/historico.html?id=${agendamento.idAgendamento}`;
      });

      container.appendChild(card);
    }
  });
}

async function excluirAgendamento(id) {
  try {
    const response = await fetch(`http://localhost:8080/agendamentos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir o agendamento");

    console.log(`Agendamento com ID ${id} excluído com sucesso.`);
    alert(`Agendamento excluído com sucesso.`);

    fetchServices();
  } catch (error) {
    console.error("Erro ao excluir o agendamento:", error);
    alert("Ocorreu um erro ao excluir o agendamento.");
  }
}

fetchServices();

document.getElementById("botaoCadastrar").addEventListener("click", () => {
  window.location.href = "../../Exibir barbearias/exibir.html";
});
