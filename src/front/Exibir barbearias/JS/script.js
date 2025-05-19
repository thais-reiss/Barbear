async function fetchServices() {
    try {
      const response = await fetch("http://localhost:8080/barbearia");
      if (!response.ok) throw new Error("Erro na requisição");
  
      const barbearias = await response.json();
      console.log(barbearias);  // Verifique o retorno da requisição
      displayServices(barbearias);
    } catch (error) {
      console.error("Erro ao buscar as barbearias:", error);
    }
  }
  
  function displayServices(barbearias) {
    const container = document.getElementById("shop-content");
    container.innerHTML = ""; 
  
    barbearias.forEach((barbearia) => {
      const card = document.createElement("div");
      card.classList.add("row");
  
      card.innerHTML = `
        <h3>${barbearia.nomeBarbearia}</h3>
        <p> 
        <span style="color: orange;"> Telefone:</span> ${barbearia.telefoneBarbearia} <br>
        <span style="color: orange;"> Endereço: </span> ${barbearia.enderecoBarbearia} <br>     
        </p>
        <div class="in-text">
          <div class="s-btnn">
            <a href="../Exibir servicos/servicos.html?id=${barbearia.idBarbearia}">Ver serviços</a>
          </div>
        </div>
      `;
  
      container.appendChild(card);
    });
  }
  
  document.addEventListener("DOMContentLoaded", fetchServices);
  