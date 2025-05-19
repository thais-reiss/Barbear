function getIdServicoDaURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}
const idServico = getIdServicoDaURL();

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`http://localhost:8080/servico/${idServico}`);

    if (!response.ok) {
      alert("Erro ao carregar os dados do serviço.");
      return;
    }
    const servico = await response.json();

    document.getElementById("nomeServico").value = servico.nomeServico || "";
    document.getElementById("tipoServico").value = servico.tipoServico || "";
    document.getElementById("preco").value = servico.precoServico || "";
    document.getElementById("descricaoServico").value = servico.descricaoServico || "";
    document.getElementById("imagem").value = servico.imagemServico || "";

  } catch (error) {
    console.error("Erro ao carregar dados do serviço a ser alterado: ", error);
    //alert("Erro ao carregar os dados do serviço.");
  }
});

document.getElementById("nextButton").addEventListener("click", async (ev) => {
  ev.preventDefault();
 /* const idBarbearia = prompt(
    "Digite o ID da barbearia que deseja atualizar o serviço: "
  );*/

  let idBarbearia = localStorage.getItem("barbeariaId");

  const nomeServico = document.getElementById("nomeServico").value;
  const precoServico = Math.floor(parseFloat(document.getElementById("preco").value) * 100) / 100;
  const descricaoServico = document.getElementById("descricaoServico").value;
  const tipoServico = document.getElementById("tipoServico").value;
  const imagemServico = document.getElementById("imagem").value;

  if (!validacao(nomeServico, tipoServico, precoServico, descricaoServico)) {
    return;
  }

  console.log('ID do serviço a ser atualizado: ', idServico);

  const servico = {
    nomeServico: nomeServico,
    descricaoServico: descricaoServico,
    tipoServico: tipoServico,
    precoServico: precoServico,
    imagemServico: imagemServico,
    idBarbearia: idBarbearia,
  };

  try {
    const response = await fetch(`http://localhost:8080/servico/${idServico}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servico),
    });

    if (!response.ok) {
      const mensagemDeErro = await response.text();
      console.error("Erro ao atualizar o serviço. ", mensagemDeErro);
      /*alert("Erro ao atualizar o serviço.");*/
      return;
    }

    const dados = await response.json();
    alert("Serviço atualizado com sucesso!");
    console.log(dados);
    window.location.href = "../Meus servicos/meus-servicos.html";
  } catch (error) {
    console.error("Erro: ", error);
    alert("Erro ao atualizar serviço.");
  } finally {
    document.getElementById("nomeServico").value = "";
    document.getElementById("tipoServico").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("descricaoServico").value = "";
    document.getElementById("imagem").value = "";
  }
});

/*//Demonstração de imagem
const inputFile = document.querySelector("#imagemServico");
const pictureImage = document.querySelector(".picture");
const pictureImageTxt = "Choose an image";
pictureImage.innerHTML = pictureImageTxt;


inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("imagemServico");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});*/

function validacao(nomeServico, tipoServico, preco, descricao) {
 
  nomeServico = nomeServico.trim(); 

  if (nomeServico === "" || nomeServico.length < 3) {
    alert("O nome do serviço deve ter pelo menos 3 caracteres.");
    return false;
  }

  const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

  if (!nomeRegex.test(nomeServico)) {
    alert("O nome do serviço deve conter apenas letras.");
    return false;
  }

  tipoServico = tipoServico.trim();

  if(tipoServico === "" || tipoServico.length < 3) {
    alert("O tipo de serviço deve ter pelo menos 3 caracteres.");
    return false;
  }

  if(!nomeRegex.test(tipoServico)) {
    alert("O tipo de serviço deve conter apenas letras.");
    return false;
  }

  const precoRegex = new RegExp(
    /^\d+(\.\d{1,2})?$/
  );

  if (!precoRegex.test(preco)) {
    alert("Informe um valor de preço válido.");
    return false;
  }

  descricao = descricao.trim();

  const descricaoRegex = new RegExp(
    /^[a-zA-ZÀ-ÿ0-9.\s]+$/
  );

  if(descricao === "" || descricao.length < 10) {
    alert("A descrição do serviço deve pelo menos 10 caracteres.");
    return false;
  }

  if(!descricaoRegex.test(descricao)) {
    alert("A descrição deve conter somente letras ou números.")
  }
  return true;
}