let step = 1;

function validacao(email, senha, nome, cnpj, telefone, horarios, cep, rua, bairro) {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
  );
  if (!emailRegex.test(email)) {
    alert("Insira um email válido.");
    return "principal";
  }

  if (senha.length < 8) {
    alert("A senha deve ter pelo menos 8 dígitos.");
    return "principal";
  }

  nome = nome.trim();

  if (nome === "" || nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return "principal";
  }

  const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

  if (!nomeRegex.test(nome)) {
    alert("O nome deve conter apenas letras.");
    return "principal";
  }

  const cnpjRegex = /^\d{14}$/;
  if (!cnpjRegex.test(cnpj)) {
    alert("O CNPJ deve conter 14 números.");
    return "principal";
  }

  const telefoneRegex = new RegExp(
    /^\d{9}$/
  );

  if (telefone.length < 9 || telefone.length > 9) {
    alert("O telefone deve conter 9 dígitos (considerando o dígito verificador).");
    return "principal";
  }

  if (!telefoneRegex.test(telefone)) {
    alert("O telefone deve conter apenas números.");
    return "principal";
  }

  if (horarios.length === 0) {
    alert("Selecione pelo menos 1 horário.");
    return "principal";
  }

  const cepRegex = /^\d{8}$/;
  if (!cepRegex.test(cep)) {
    alert("O CEP deve conter 8 números.");
    return "endereco";
  }

  if (rua.length === "" || rua.length < 5) {
    alert("A rua deve ter pelo menos 5 caracteres.");
    return "endereco";
  }

  if (bairro.length === "" || bairro.length < 3) {
    alert("O bairro deve ter pelo menos 3 caracteres.");
    return "endereco";
  }

  return "valido";
}

document
  .getElementById("nextButton")
  .addEventListener("click", async function () {
    if (step === 1) {
      document.getElementById("EmailBarbearia").classList.add("hidden");
      document
        .querySelector('label[for="EmailBarbearia"]')
        .classList.add("hidden");
      document.getElementById("SenhaBarbearia").classList.add("hidden");
      document
        .querySelector('label[for="SenhaBarbearia"]')
        .classList.add("hidden");
      document.getElementById("NomeBarbearia").classList.add("hidden");
      document
        .querySelector('label[for="NomeBarbearia"]')
        .classList.add("hidden");
      document.getElementById("CNPJ").classList.add("hidden");
      document.querySelector('label[for="CNPJ"]').classList.add("hidden");
      document.getElementById("Telefone").classList.add("hidden");
      document.querySelector('label[for="Telefone"]').classList.add("hidden");

      const horarioInputs = document.querySelectorAll('input[name="horario"]');
      horarioInputs.forEach((input) => input.classList.add("hidden"));
      const horarioLabels = document.querySelectorAll('label[for^="horario"]');
      horarioLabels.forEach((label) => label.classList.add("hidden"));

      document.getElementById("CEP").classList.remove("hidden");
      document.querySelector('label[for="CEP"]').classList.remove("hidden");
      document.getElementById("Rua").classList.remove("hidden");
      document.querySelector('label[for="Rua"]').classList.remove("hidden");
      document.getElementById("Bairro").classList.remove("hidden");
      document.querySelector('label[for="Bairro"]').classList.remove("hidden");

      this.textContent = "FINALIZAR";

      step = 2;
    } else {
      const email = document.getElementById("EmailBarbearia").value;
      const senha = document.getElementById("SenhaBarbearia").value;
      const nome = document.getElementById("NomeBarbearia").value;
      const cnpjBarbearia = document.getElementById("CNPJ").value;
      const telefone = document.getElementById("Telefone").value;
      const horarios = Array.from(
        document.querySelectorAll('input[name="horario"]:checked')
      ).map((input) => input.value);
      const cep = document.getElementById("CEP").value;
      const rua = document.getElementById("Rua").value;
      const bairro = document.getElementById("Bairro").value;

      const validacaoResultado = validacao(
        email,
        senha,
        nome,
        cnpjBarbearia,
        telefone,
        horarios,
        cep,
        rua,
        bairro
      );

      if (validacaoResultado === "principal") {
        alternarCampos("principal");
        return;
      }

      if (validacaoResultado === "endereco") {
        alternarCampos("endereco");
        return;
      }

      const barbeariaData = {
        emailBarbearia: email,
        senhaBarbearia: senha,
        nomeBarbearia: nome,
        cnpj: cnpjBarbearia,
        telefoneBarbearia: telefone,
        horario: horarios,
        cep: cep,
        rua: rua,
        bairro: bairro,
      };

      try {
        const response = await fetch("http://localhost:8080/barbearia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(barbeariaData),
        });

        if (!response.ok) {
          const mensagemDeErro = await response.text();
          console.error("Erro ao cadastrar a barbearia. ", mensagemDeErro);
          alert("Erro ao cadastrar a barbearia.");
          return;
        }

        const dados = await response.json();
        alert("Barberia cadastrada com sucesso!");
        console.log(dados);

       /*window.location.href = "../Minha conta/minhaConta.html";*/
       window.location.href = "../Pagina de Login/login.html";
       
      } catch (error) {
        console.error("Erro na requisição.", error);
        alert("Erro na requisição. Verifique sua conexão e tente novamente.");
      } finally {
        document.getElementById("EmailBarbearia").value = "";
        document.getElementById("SenhaBarbearia").value = "";
        document.getElementById("NomeBarbearia").value = "";
        document.getElementById("CNPJ").value = "";
        document.getElementById("Telefone").value = "";
        document.querySelectorAll('input[name="horario"]').forEach((input) => {
          input.checked = false;
        });
        document.getElementById("CEP").value = "";
        document.getElementById("Rua").value = "";
        document.getElementById("Bairro").value = "";

        document.getElementById("EmailBarbearia").classList.remove("hidden");
        document
          .querySelector('label[for="EmailBarbearia"]')
          .classList.remove("hidden");
        document.getElementById("SenhaBarbearia").classList.remove("hidden");
        document
          .querySelector('label[for="SenhaBarbearia"]')
          .classList.remove("hidden");
        document.getElementById("NomeBarbearia").classList.remove("hidden");
        document
          .querySelector('label[for="NomeBarbearia"]')
          .classList.remove("hidden");
        document.getElementById("CNPJ").classList.remove("hidden");
        document.querySelector('label[for="CNPJ"]').classList.remove("hidden");
        document.getElementById("Telefone").classList.remove("hidden");
        document.querySelector('label[for="Telefone"]').classList.remove("hidden");

        const horarioInputs = document.querySelectorAll('input[name="horario"]');
        horarioInputs.forEach((input) => input.classList.remove("hidden"));
        const horarioLabels = document.querySelectorAll('label[for^="horario"]');
        horarioLabels.forEach((label) => label.classList.remove("hidden"));

        document.getElementById("CEP").classList.add("hidden");
        document.querySelector('label[for="CEP"]').classList.add("hidden");
        document.getElementById("Rua").classList.add("hidden");
        document.querySelector('label[for="Rua"]').classList.add("hidden");
        document.getElementById("Bairro").classList.add("hidden");
        document.querySelector('label[for="Bairro"]').classList.add("hidden");

        document.getElementById("nextButton").textContent = "CONTINUAR";
        step = 1;
      }
    }
  });

function alternarCampos(estado) {
  const camposPrincipais = [
    "EmailBarbearia",
    "SenhaBarbearia",
    "NomeBarbearia",
    "CNPJ",
    "Telefone",
  ];
  const horarios = document.querySelectorAll('input[name="horario"]');
  const horarioLabels = document.querySelectorAll('label[for^="horario"]');
  const camposEndereco = ["CEP", "Rua", "Bairro"];

  if (estado === "principal") {
    camposPrincipais.forEach((id) => {
      document.getElementById(id).classList.remove("hidden");
      document.querySelector(`label[for="${id}"]`).classList.remove("hidden");
    });

    camposEndereco.forEach((id) => {
      document.getElementById(id).classList.add("hidden");
      document.querySelector(`label[for="${id}"]`).classList.add("hidden");
    });

    horarios.forEach((input) => {
      input.parentElement.classList.remove("hidden");
    });

    horarioLabels.forEach((label) => label.classList.remove("hidden"));

    document.getElementById("nextButton").textContent = "CONTINUAR";
    step = 1;
  } else if (estado === "endereco") {
    camposEndereco.forEach((id) => {
      document.getElementById(id).classList.remove("hidden");
      document.querySelector(`label[for="${id}"]`).classList.remove("hidden");
    });

    camposPrincipais.forEach((id) => {
      document.getElementById(id).classList.add("hidden");
      document.querySelector(`label[for="${id}"]`).classList.add("hidden");
    });

    horarios.forEach((input) => {
      input.parentElement.classList.add("hidden");
    });
  }
}