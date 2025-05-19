//const btnMostrar = document.getElementById("btnMostrar");
const btnOcultar = document.getElementById("btnOcultar");
const popup = document.getElementById("popup");
const container = document.getElementById("agendamento-container");
const idCliente = localStorage.getItem("clienteId");
const idAgendamento = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:8080/agendamentos/${idAgendamento}`;

async function carregarAgendamento() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao carregar agendamento.");
    }
    const agendamento = await response.json();

    const agendamentoHTML = `
      <div class="product-card">
        <div class="detalhes-corte">
          <div class="main-images">
            <img id="cabelo" class="cabelo" src="${agendamento.servico.imagemServico}" alt="cabelo" />
          </div>
          <span class="corte_name">Serviço: ${agendamento.servico.nomeServico}</span>
          <p>Descrição: ${agendamento.descricaoAgendamento || "Sem descrição disponível."}</p>
          <div class="date">
            <span class="date_num">Data: ${new Date(agendamento.dataAgendamento).toLocaleDateString()}</span></br>
            <span class="hours_num">Horário: ${formatarHorario(agendamento.horarioAgendamento)}</span>
          </div>
          <div class="button">
            <button id="btnMostrar" class="butao">Avaliar</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = agendamentoHTML;

    const btnMostrar = document.getElementById("btnMostrar");
    btnMostrar.addEventListener("click", () => {
      popup.style.display = "block";
    });

    document.getElementById("btnSalvar").addEventListener("click", async () => {
      const comentario = document.getElementById("descricaoAvaliacao").value;
      const nota = document.getElementById("nota").value;
  
      const response = await fetch(`http://localhost:8080/agendamentos/${idAgendamento}`);
      const agendamento = await response.json();
      const barbeariaId = agendamento.barbearia.idBarbearia;
  
      const avaliacaoData = {
          nota: parseInt(nota),
          comentario: comentario,
          clienteId: parseInt(idCliente),
          barbeariaId: parseInt(barbeariaId),
          agendamentoId: parseInt(idAgendamento)
      };
      console.log(avaliacaoData);
  
      fetch("http://localhost:8080/avaliacoes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(avaliacaoData)
      })
      .then(response => {
          if (response.ok) {
              alert("Avaliação salva com sucesso!");
              document.getElementById("popup").style.display = "none";
          } else {
              alert("Erro ao salvar avaliação.");
          }
      })
      .catch(error => {
          console.error("Erro na requisição:", error);
          alert("Erro ao salvar avaliação.");
      });
  });
  } catch (error) {
    console.error("Erro ao carregar agendamento:", error);
  }
}

btnOcultar.addEventListener("click", () => {
  popup.style.display = "none";
});

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

carregarAgendamento();

/*btnMostrar.addEventListener("click", () => {
  conteudo.style.display = "grid";
});

btnSalvar.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const idBarbearia = prompt(
    "Digite o ID da barbearia em que deseja adicionar a avaliação: "
  );

  //const idCliente = prompt("Digite o ID do cliente que está avaliando: ");

  /*if (!idBarbearia || !idCliente) {
    alert("Por favor, preencha todos os campos de ID corretamente.");
    return;
  }

  const nota = parseInt(document.getElementById("nota").value);
  const comentario = document.getElementById("descricaoAvaliacao").value;

  const dadosAvaliacao = {
    nota: nota,
    comentario: comentario,
    barbeariaId: parseInt(idBarbearia),
    clienteId: parseInt(idCliente),
  };

  try {
    const response = await fetch("http://localhost:8080/avaliacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosAvaliacao),
    });

    if (!response.ok) {
      const mensagemDeErro = await response.text();
      console.error("Erro ao salvar avaliação. ", mensagemDeErro);
      alert("Erro ao salvar avaliação.");
      return;
    }

    const dados = await response.json();
    alert("Avaliação salva com sucesso!");
    console.log(dados);
  } catch (error) {
    console.error("Erro na requisição.", error);
    alert("Erro na requisição. Verifique sua conexão e tente novamente.");
  } finally {
    conteudo.style.display = "none";
  }
});

btnOcultar.addEventListener("click", () => {
  conteudo.style.display = "none";
});

let identificacao = prompt(
  "Deseja ver da perspectiva da barbearia ou do cliente?"
);

if (identificacao === "barbearia") {
  async function fetchServices() {
    try {
      const response = await fetch("http://localhost:8080/servico");
      if (!response.ok) throw new Error("Erro na requisição");

      const services = await response.json();
      displayServices(services);
    } catch (error) {
      console.error("Erro ao buscar os serviços:", error);
    }
  }

  function displayServices(services) {
    const container = document.getElementById("services-container");
    container.innerHTML = "";
    let idBarbearia = prompt(
      "Digite o id da barbearia da qual você deseja obter os serviços:"
    );

    services.forEach((service) => {
      if (String(idBarbearia) === String(service.barbearia.idBarbearia)) {
        const precoFormatado = parseFloat(service.precoServico).toFixed(2);
        const card = document.createElement("div");
        card.classList.add("service-card");

        card.innerHTML = `
          <div class="logo-cart">
            <img src="../../../../docs/images/logoBarBear2.png" alt="Logo da barbearia" />
            <i class="bx bx-shopping-bag"></i>
          </div>
          <div class="service-image">
              <img src="${service.imagem}" alt="Imagem do Serviço" class="service-image-img" />
          </div>
          <div class="detalhes-corte">
            <span class="corte_name">${service.nomeServico}</span>
            <p>
              Descrição: ${service.descricaoServico} <br>
              Tipo do Serviço: ${service.tipoServico} <br>
            </p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bx-star"></i>
            </div>
            <div class="price">
              <span class="price_num">R$${precoFormatado}</span>
            </div>
            <button class="botao alterarServicoBtn">Alterar Serviço</button>
            <button class="botao excluirServicoBtn">Excluir Serviço</button>
          </div>
        `;

        const alterarBtn = card.querySelector(".alterarServicoBtn");
        alterarBtn.addEventListener("click", () => {
          window.location.href = `../Alterar servico/inserir.html?id=${service.idServico}`;
        });

        const excluirBtn = card.querySelector(".excluirServicoBtn");
        excluirBtn.addEventListener("click", () =>
          excluirServico(service.idServico)
        );

        container.appendChild(card);
      }
    });
  }

  async function excluirServico(id) {
    try {
      const response = await fetch(`http://localhost:8080/servico/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir o serviço");

      console.log(`Serviço com ID ${id} excluído com sucesso.`);
      alert(`Serviço excluído com sucesso.`);

      fetchServices();
    } catch (error) {
      console.error("Erro ao excluir o serviço:", error);
      alert("Ocorreu um erro ao excluir o serviço.");
    }
  }

  fetchServices();
}

document.getElementById("botaoCadastrar").addEventListener("click", () => {
  window.location.href = "../Cadastrar servico/inserir.html";
});*/
