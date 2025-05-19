const idBarbearia = localStorage.getItem("barbeariaId");
const url = "http://localhost:8080/agendamentos";

const containerPendentes = document.getElementById("pendentes-container");
const containerConfirmados = document.getElementById("confirmados-container");

async function carregarAgendamentos() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Erro ao buscar agendamentos');
      alert('Erro ao buscar agendamentos.');
      return;
    }

    const agendamentos = await response.json();

    const agendamentosDaBarbearia = agendamentos.filter(
      (agendamento) => agendamento.barbearia.idBarbearia === Number(idBarbearia)
    );

    const pendentes = agendamentosDaBarbearia.filter(
      (agendamento) => agendamento.statusAgendamento === 1
    );
    const confirmados = agendamentosDaBarbearia.filter(
      (agendamento) => agendamento.statusAgendamento === 2
    );

    exibirAgendamentos(pendentes, containerPendentes);
    exibirAgendamentos(confirmados, containerConfirmados);
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
}

function exibirAgendamentos(agendamentos, container) {
  container.innerHTML = "";
  agendamentos.forEach((agendamento) => {
    const cardHTML = `
      <div class="product-card" id="services-container">
        <div class="logo-cart">
          <img src="../../../../docs/images/logoBarBear2.png" alt="Logo da barbearia" />
        </div>
        <div class="main-images">
          <img class="cabelo" src="${agendamento.servico.imagemServico}" alt="Imagem do serviço" />
        </div>
        <div class="detalhes-corte">
          <span class="corte_name">${agendamento.servico.nomeServico}</span>
          <p>${agendamento.descricaoAgendamento || "Sem descrição disponível"}</p>
          <div class="date">
            <span class="date_num">${new Date(agendamento.dataAgendamento).toLocaleDateString()}</span>
            <span class="hours_num">${formatarHorario(agendamento.horarioAgendamento)}</span>
          </div>
          ${agendamento.statusAgendamento === 1
        ? `<div class="button">
                   <button class="butao confirmar" data-id="${agendamento.idAgendamento}">Confirmar</button>
                   <button class="butao cancelar" data-id="${agendamento.idAgendamento}">Cancelar</button>
                 </div>`
        : ""
      }
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });

  const botoesConfirmar = container.querySelectorAll(".confirmar");
  botoesConfirmar.forEach((botao) =>
    botao.addEventListener("click", () => confirmarAgendamento(botao.dataset.id))
  );

  const botoesCancelar = container.querySelectorAll(".cancelar");
  botoesCancelar.forEach((botao) =>
    botao.addEventListener("click", () => cancelarAgendamento(botao.dataset.id))
  );
}

async function confirmarAgendamento(idAgendamento) {
  try {
    const response = await fetch(`${url}/${idAgendamento}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar agendamento: ${response.status}`);
    }
    const agendamento = await response.json();
    agendamento.statusAgendamento = 2;

    const dataAgendamentoArray = agendamento.dataAgendamento;
    const dataAgendamento = new Date(dataAgendamentoArray[0], dataAgendamentoArray[1] - 1, dataAgendamentoArray[2]);
    const dataFormatted = dataAgendamento.toISOString().split('T')[0];

    /*console.log(JSON.stringify({
      dataAgendamento: dataFormatted,
        horarioAgendamento: formatarHorario(agendamento.horarioAgendamento),
        descricaoAgendamento: agendamento.descricaoAgendamento,
        idCliente: Number(agendamento.cliente.idCliente),
        idBarbearia: Number(agendamento.barbearia.idBarbearia),
        idServico: Number(agendamento.servico.idServico),
        statusAgendamento: agendamento.statusAgendamento,
    }));*/

    const updateResponse = await fetch(`${url}/${idAgendamento}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataAgendamento: dataFormatted,
        horarioAgendamento: formatarHorario(agendamento.horarioAgendamento),
        descricaoAgendamento: agendamento.descricaoAgendamento,
        idCliente: Number(agendamento.cliente.idCliente),
        idBarbearia: Number(agendamento.barbearia.idBarbearia),
        idServico: Number(agendamento.servico.idServico),
        statusAgendamento: agendamento.statusAgendamento,
      }),
    });

    if (updateResponse.ok) {
      alert("Agendamento confirmado!");
      carregarAgendamentos();
    } else {
      const errorDetails = await updateResponse.text();
      alert("Erro ao confirmar agendamento!");
      console.error(`Erro ao confirmar agendamento: ${updateResponse.status} - ${errorDetails}`);
    }
  } catch (error) {
    console.error("Erro ao confirmar agendamento:", error);
  }
}

async function cancelarAgendamento(idAgendamento) {
  try {
    const response = await fetch(`${url}/${idAgendamento}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar agendamento: ${response.status}`);
    }
    const agendamento = await response.json();
    agendamento.statusAgendamento = 0;

    const dataAgendamentoArray = agendamento.dataAgendamento;
    const dataAgendamento = new Date(dataAgendamentoArray[0], dataAgendamentoArray[1] - 1, dataAgendamentoArray[2]);
    const dataFormatted = dataAgendamento.toISOString().split('T')[0];

    /*console.log(JSON.stringify({
      dataAgendamento: dataFormatted,
        horarioAgendamento: formatarHorario(agendamento.horarioAgendamento),
        descricaoAgendamento: agendamento.descricaoAgendamento,
        idCliente: Number(agendamento.cliente.idCliente),
        idBarbearia: Number(agendamento.barbearia.idBarbearia),
        idServico: Number(agendamento.servico.idServico),
        statusAgendamento: agendamento.statusAgendamento,
    }));*/

    const updateResponse = await fetch(`${url}/${idAgendamento}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataAgendamento: dataFormatted,
        horarioAgendamento: formatarHorario(agendamento.horarioAgendamento),
        descricaoAgendamento: agendamento.descricaoAgendamento,
        idCliente: Number(agendamento.cliente.idCliente),
        idBarbearia: Number(agendamento.barbearia.idBarbearia),
        idServico: Number(agendamento.servico.idServico),
        statusAgendamento: agendamento.statusAgendamento,
      }),
    });

    if (updateResponse.ok) {
      alert("Agendamento cancelado!");
      carregarAgendamentos();
    } else {
      const errorDetails = await updateResponse.text();
      alert("Erro ao cancelar agendamento!");
      console.error(`Erro ao cancelar o agendamento: ${updateResponse.status} - ${errorDetails}`);
    }
  } catch (error) {
    console.error("Erro ao cancelar o agendamento:", error);
  }
}

carregarAgendamentos();

function formatarHorario(horario) {
  const horarioComPonto = horario.toString().replace(',', '.');
  const horarioNumerico = parseFloat(horarioComPonto);

  if (!isNaN(horarioNumerico)) {
    const horas = Math.floor(horarioNumerico);
    const minutos = Math.round((horarioNumerico - horas) * 60);

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  } else {
    return horario;
  }
}