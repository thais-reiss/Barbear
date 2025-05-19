function getIdBarbeariaDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  const idBarbearia = getIdBarbeariaDaURL();
  let nomeBarbearia;

  async function fetchServices() {
    try {
    
      const responseServices = await fetch("http://localhost:8080/servico");
      if (!responseServices.ok) throw new Error("Erro ao buscar os serviços");
  
      const services = await responseServices.json();
  
     
      const responseBarbearia = await fetch(`http://localhost:8080/barbearia/${idBarbearia}`);
      if (!responseBarbearia.ok) throw new Error("Erro ao buscar a barbearia");
  
      const barbearia = await responseBarbearia.json();
  
      nomeBarbearia = barbearia.nomeBarbearia;
      displayServices(services);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  function displayServices(services) {
    const tituloServicos = document.getElementById("tituloServicos");
   tituloServicos.textContent = nomeBarbearia; 

    const container = document.getElementById("container");
    container.innerHTML = "";
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
           <span style="color: orange;"> Descrição: </span> ${service.descricaoServico} <br>
              <span style="color: orange;"> Tipo do serviço: </span> ${service.tipoServico} <br>
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
           <div class="button">
              <button id="btnMostrar" class="butao" >Agendar</button>
            </div>
        </div>
      </div>

        `;

        const alterarBtn = card.querySelector(".butao");
        alterarBtn.addEventListener("click", () => {
          window.location.href = `../Agendamento/Novo agendamento/agendamento.html?id=${service.idServico}`;
        });

        container.appendChild(card);
      }
    });
  }

 

  fetchServices();

document.getElementById("botaoCadastrar").addEventListener("click", () => {
  window.location.href = "../Exibir barbearias/exibir.html";
});
