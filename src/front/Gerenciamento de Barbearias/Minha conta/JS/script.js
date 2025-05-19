/*document.getElementById("botaoC").addEventListener("click", function () {
  window.location.href = "../Excluir dados/excluir.html";
});

document.getElementById("botaoA").addEventListener("click", function () {
  window.location.href = "../Alterar dados/alteracao.html";
});

document.getElementById("botaoB").addEventListener("click", function () {
  window.location.href = "../../Gerenciamento de servicos/Meus servicos/meus-servicos.html";
});*/

window.addEventListener('DOMContentLoaded', async () => {

  /*const idBarbearia = prompt(
    "Digite o ID da barbearia: "
  );*/
  const idBarbearia = localStorage.getItem("barbeariaId");

  try {
    const response = await fetch(`http://localhost:8080/barbearia/${idBarbearia}`);

    if (!response.ok) {
      alert("Erro ao carregar os dados da Barbearia.");
      return;
    }
    const barbearia = await response.json();

    const emailBarbearia = document.getElementById("EmailBarbearia");
    const nomeBarbearia = document.getElementById("NomeBarbearia");
    const cnpj = document.getElementById("CNPJ");
    const telefoneBarbearia = document.getElementById("Telefone");
    const cep = document.getElementById("CEP");
    const rua = document.getElementById("Rua");
    const bairro = document.getElementById("Bairro");

    const endereco = barbearia.enderecoBarbearia;
    const partes = endereco.split(',');
    const cepEndereco = partes[0].replace("CEP:", "").trim();
    const ruaEndereco = partes[1].replace("Rua:", "").trim();
    const bairroEndereco = partes[2].replace("Bairro:", "").trim();

    emailBarbearia.value = barbearia.emailBarbearia;
    nomeBarbearia.value = barbearia.nomeBarbearia;
    cnpj.value = barbearia.cnpj;
    telefoneBarbearia.value = barbearia.telefoneBarbearia;
    cep.value = cepEndereco;
    rua.value = ruaEndereco;
    bairro.value = bairroEndereco;


    document.getElementById("botaoC").addEventListener("click", function () {
      window.location.href = `../Excluir dados/excluir.html?id=${barbearia.idBarbearia}`;
    });

    document.getElementById("botaoA").addEventListener("click", function () {
      window.location.href = `../Alterar dados/alteracao.html?id=${barbearia.idBarbearia}`;
    });

    document.getElementById("botaoB").addEventListener("click", function () {
      window.location.href = "../../Gerenciamento de servicos/Meus servicos/meus-servicos.html";
    });

    document.getElementById("botaoE").addEventListener("click", function () {
      window.location.href = "../Minhas avaliacoes/minhasAvaliacoes.html";
    });

    document.getElementById("botaoD").addEventListener("click", function () {
      window.location.href = "../Indicadores de desempenho/indicadores.html";
    });

    document.getElementById("botaoF").addEventListener("click", function () {
      window.location.href = "../Meus agendamentos/agendamentos.html";
    });
  } catch (error) {
    console.error("Erro ao carregar dados da barbearia: ", error);
    alert("Erro ao carregar os dados da barbearia.");
  }
});

document.getElementById("botaoG").addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "../../HomePage/index.html";
});