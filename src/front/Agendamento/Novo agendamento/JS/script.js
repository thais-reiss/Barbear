const btn = document.getElementById("btn");

let disponibilidadeBarbearia, idBarbearia, idServico, nomeDoServico;

const idCliente = localStorage.getItem("clienteId"); 

window.addEventListener('DOMContentLoaded', async () => {

  function getIdServicoDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  idServico = getIdServicoDaURL();

  try {
    const responseServico = await fetch(`http://localhost:8080/servico/${idServico}`); 

    if (!responseServico.ok) {
      alert("Erro ao carregar os dados do serviço.");
      return;
    }
    const servico = await responseServico.json();

    const nomeServico = document.getElementById("service");
    nomeServico.value = servico.nomeServico || "";
    nomeServico.ariaPlaceholder = nomeServico;

    nomeDoServico = servico.nomeServico;
    idBarbearia = servico.barbearia.idBarbearia;

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

    const barbearia = await responseBarbearia.json();


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
});

btn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const dataDigitada = document.getElementById("data").value;
  const horario = document.getElementById("tipo").value;
  const descricao = document.getElementById("descricao").value || "";

  if (disponibilidadeBarbearia.includes(horario)) {
    alert("Horário disponível.");

    const agendamento = {
      dataAgendamento: dataDigitada, 
      horarioAgendamento: horario,   
      descricaoAgendamento: descricao, 
      idCliente: idCliente,          
      idBarbearia: idBarbearia,      
      idServico: idServico   
    };


    try {
      const response = await fetch("http://localhost:8080/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        const mensagemDeErro = await response.text();
        console.error("Erro ao realizar o agendamento. ", mensagemDeErro);
        alert("Erro ao realizar o agendamento. ", mensagemDeErro);
        return;
      }

      const dados = await response.json();
      alert("Agendamento realizado com sucesso!");
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
  } else {
    alert("Horário não disponível.");
  }

});


