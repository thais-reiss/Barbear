
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
    const container = document.getElementById("container");
    container.innerHTML = "";
    /*let idBarbearia = prompt("Digite o id da barbearia da qual você deseja obter os serviços:");*/

    let idBarbearia = localStorage.getItem("barbeariaId");


    services.forEach((service) => {
      if (String(idBarbearia) === String(service.barbearia.idBarbearia)) {
        const precoFormatado = parseFloat(service.precoServico).toFixed(2);
        const card = document.createElement("div");
        card.classList.add("service-card");

        card.innerHTML = `
          <div class="product-card" id="services-container">
        <div class="logo-cart">
          <img src="../../../../docs/images/logoBarBear2.png" alt="Logo da barbearia" />
          <i class="bx bx-shopping-bag"></i>
        </div>
        <div class="main-images">
          <img id="cabelo" class="cabelo" src="${service.imagemServico}" alt="cabelo" />
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
            <span class="price_num">${precoFormatado}</span>
          </div>
        </div>
        <button class="botao alterarServicoBtn">Alterar Serviço</button>
         <button class="botao excluirServicoBtn">Excluir Serviço</button>
      </div>

        `;

        const alterarBtn = card.querySelector(".alterarServicoBtn");
        alterarBtn.addEventListener("click", () => {
          window.location.href = `../Alterar servico/alterar.html?id=${service.idServico}`;
        });

        const excluirBtn = card.querySelector(".excluirServicoBtn");
        excluirBtn.addEventListener("click", () => excluirServico(service.idServico));

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

document.getElementById("botaoCadastrar").addEventListener("click", () => {
  window.location.href = "../Cadastrar servico/inserir.html";
});
