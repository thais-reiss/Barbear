/*const idAgendamento = prompt(
  "Digite o ID do agendamento que se deseja alterar:"
);
const idServico = prompt("Digite o ID do serviço que está nesse agendamento: ");
let disponibilidadeServico, idBarbearia;*/

function getIdAgendamentoDaURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

const idAgendamento = getIdAgendamentoDaURL();
const idCliente = localStorage.getItem("clienteId");

let idServico, idBarbearia, disponibilidadeBarbearia, servico, barbearia, agendamento;

const btn = document.getElementById("btn");


window.addEventListener('DOMContentLoaded', async () => {
  try {
    const responseServico = await fetch(`http://localhost:8080/agendamentos/${idAgendamento}`); 

    if (!responseServico.ok) {
      alert("Erro ao carregar os dados do agendamento.");
      return;
    }
    agendamento = await responseServico.json();

    idServico = agendamento.servico.idServico;
    idBarbearia = agendamento.barbearia.idBarbearia;

  } catch (error) {
    console.error("Erro ao carregar dados do agendamento: ", error);
    alert("Erro ao carregar os dados do agendamento.");
  }


  try {
    const responseServico = await fetch(`http://localhost:8080/servico/${idServico}`); 

    if (!responseServico.ok) {
      alert("Erro ao carregar os dados do serviço.");
      return;
    }
    servico = await responseServico.json();

  } catch (error) {
    console.error("Erro ao carregar dados do serviço: ", error);
    alert("Erro ao carregar os dados do serviço.");
  }

  try {
    const responseBarbearia = await fetch(`http://localhost:8080/barbearia/${idBarbearia}`);

    if (!responseBarbearia.ok) {
      alert("Erro ao carregar os dados da barbearia.");
      return;
    }

    barbearia = await responseBarbearia.json();


    disponibilidadeBarbearia = barbearia.horario;

    const horarioSelect = document.getElementById("tipo");


    disponibilidadeBarbearia.forEach(horario => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      horarioSelect.appendChild(option);
    });


  } catch (error) {
    console.error("Erro ao carregar dados da barbearia: ", error);
    alert("Erro ao carregar os dados da barbearia.");
  }

  const dataAgendamento = agendamento.dataAgendamento;
  const horarioAgendamento = agendamento.horarioAgendamento;
  
  const padZero = (num) => num.toString().padStart(2, '0');
  
  const dataFormatada = `${dataAgendamento[0]}-${padZero(dataAgendamento[1])}-${padZero(dataAgendamento[2])}`;
  
  const horarioFormatado = `${padZero(horarioAgendamento[0])}:${padZero(horarioAgendamento[1])}`;
  

  document.getElementById("service").value = servico.nomeServico || "";
  document.getElementById("descricao").value = agendamento.descricaoAgendamento || "";
  document.getElementById("data").value = dataFormatada || "";
  document.getElementById("horario").value = horarioFormatado || "";
});

btn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const dataDigitada = document.getElementById("data").value;
  const horario = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value;

    const agendamento = {
      dataAgendamento: dataDigitada, 
      horarioAgendamento: horario,   
      descricaoAgendamento: descricao, 
      idCliente: idCliente,          
      idBarbearia: idBarbearia,      
      idServico: idServico
    };

    try {
      const response = await fetch(`http://localhost:8080/agendamentos/${idAgendamento}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        const mensagemDeErro = await response.text();
        console.error("Erro ao atualizar o agendamento. ", mensagemDeErro);
        alert("Erro ao atualizar o agendamento. ", mensagemDeErro);
        return;
      }

      const dados = await response.json();
      alert("Agendamento atualizado com sucesso!");
      console.log(dados);


    } catch (error) {
      console.error("Erro na requisição.", error);
      alert("Erro na requisição. Verifique sua conexão e tente novamente.");
    } finally {
      document.getElementById("service").value = "";
      document.getElementById("data").value = "";
      document.getElementById("descricao").value = "";
      document.getElementById("horario").value = "";
    }
  
  });
