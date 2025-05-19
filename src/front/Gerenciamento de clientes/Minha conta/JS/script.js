/*document.getElementById("botaoC").addEventListener("click", function () {
  window.location.href = "../Excluir conta/excluirCliente.html";
});

document.getElementById("botaoA").addEventListener("click", function () {
  window.location.href = "../Atualizar dados/atualizar.html";
});

document.getElementById("botaoB").addEventListener("click", function () {
  window.location.href = "../../Gerenciamento de servicos/Meus servicos/meus-servicos.html";
});*/

window.addEventListener("DOMContentLoaded", async () => {
  const idCliente = localStorage.getItem("clienteId");

  try {
    const response = await fetch(`http://localhost:8080/cliente/${idCliente}`);

    if (!response.ok) {
      alert("Erro ao carregar os dados do cliente.");
      return;
    }
    const cliente = await response.json();

    const emailCliente = document.getElementById("EmailCliente");
    const nomeCliente = document.getElementById("NomeCliente");
    const TelefoneCliente = document.getElementById("TelefoneCliente");

    emailCliente.value = cliente.emailCliente;
    nomeCliente.value = cliente.nomeCliente;
    TelefoneCliente.value = cliente.telefoneCliente;

    document.getElementById("botaoC").addEventListener("click", function () {
      window.location.href = `../Excluir conta/excluirCliente.html?id=${cliente.idCliente}`;
    });

    document.getElementById("botaoA").addEventListener("click", function () {
      window.location.href = `../Atualizar dados/atualizar.html?id=${cliente.idCliente}`;
    });

    document.getElementById("botaoE").addEventListener("click", function () {
      window.location.href = `../../Agendamento/Exibir agendamentos/seusAgendamentos.html?id=${cliente.idCliente}`;
    });

  } catch (error) {
    console.error("Erro ao carregar dados do cliente: ", error);
    alert("Erro ao carregar os dados do cliente.");
  }
});

document.getElementById("botaoD").addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "../../HomePage/index.html";
});
