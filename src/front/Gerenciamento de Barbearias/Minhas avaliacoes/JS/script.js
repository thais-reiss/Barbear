let idCliente;

async function fetchServices() {
  try {
    const response = await fetch("http://localhost:8080/avaliacoes");
    if (!response.ok) throw new Error("Erro na requisição");

    const avaliacoes = await response.json();
    display(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar os serviços:", error);
  }
}

async function display(avaliacoes) {
  const container = document.getElementById("containerAvaliacoes");
  container.innerHTML = "";

  let idBarbearia = localStorage.getItem("barbeariaId");

  for (const avaliacao of avaliacoes) {
    if (String(idBarbearia) === String(avaliacao.barbearia.idBarbearia)) {
      idCliente = avaliacao.cliente.idCliente;

      let nomeCliente = "";
      try {
        const responseCliente = await fetch(`http://localhost:8080/cliente/${idCliente}`);
        if (!responseCliente.ok) throw new Error("Erro na requisição");

        const cliente = await responseCliente.json();
        nomeCliente = cliente.nomeCliente;
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
      }

      const card = document.createElement("div");
      card.classList.add("avaliacao");

      card.innerHTML = `
        <div class="user">
          <input type="text" placeholder="Nome do cliente: ${nomeCliente}" disabled />
        </div>
        <div class="user">
          <input type="number" placeholder="Nota: ${avaliacao.nota}" disabled />
        </div>
        <textarea
          name="comentario"
          id="boxComentario"
          disabled
          cols="15"
          rows="5"
          placeholder="${avaliacao.comentario}"
        ></textarea>
      `;

      container.appendChild(card);
    }
  }
}

fetchServices();
