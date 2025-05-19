const btn = document.getElementById("nextButton");

btn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const nome = document.getElementById("nomeCliente").value
  const email = document.getElementById("emailCliente").value;
  const telefone = document.getElementById("telefoneCliente").value;
  console.log(telefone)
  const senha = document.getElementById("senhaCliente").value;

  if (!validacao(nome, email, telefone, senha)) {
    return;
  }

  const dadosCliente = {
    nomeCliente: nome,
    emailCliente: email,
    telefoneCliente: telefone,
    senhaCliente: senha
  };

  try {
    const response = await fetch("http://localhost:8080/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosCliente),
    });

    if (!response.ok) {
      const mensagemDeErro = await response.text();
      console.error("Erro ao cadastrar o cliente. ", mensagemDeErro);
      alert("Erro ao cadastrar o cliente. ", mensagemDeErro);
      return;
    }

    const dados = await response.json();
    alert("Cliente cadastrado com sucesso!");
    console.log(dados);
    window.location.href = "../Login cliente/loginCliente.html";
  } catch (error) {
    console.error("Erro na requisição.", error);
    alert("Erro na requisição. Verifique sua conexão e tente novamente.");
  } finally {
    document.getElementById("nomeCliente").value = "";
    document.getElementById("emailCliente").value = "";
    document.getElementById("telefoneCliente").value = "";
    document.getElementById("senhaCliente").value = "";
  }
});

function validacao(nome, email, telefone, senha) {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
  );
  if (!emailRegex.test(email)) {
    alert("Insira um email válido.");
    return false;
  }

  if (senha.length < 8) {
    alert("A senha deve ter pelo menos 8 dígitos.");
    return false;
  }

  nome = nome.trim(); 

  if (nome === "" || nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return false;
  }

  const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

  if (!nomeRegex.test(nome)) {
    alert("O nome deve conter apenas letras.");
    return false;
  }

  const telefoneRegex = new RegExp(
    /^\d{9}$/
  );

  if (telefone.length < 9 || telefone.length > 9) {
    alert("O telefone deve conter 9 dígitos (considerando o dígito verificador).");
    return false;
  }

  if (!telefoneRegex.test(telefone)) {
    alert("O telefone deve conter apenas números.");
    return false;
  }

  return true;
}