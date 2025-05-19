/*document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;

    const loginData = {
      emailBarbearia: email,
      senhaBarbearia: senha,
      tipoUsuario: tipo, // Adicionando o tipo de usuário se necessário
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const mensagemDeErro = await response.text();
        alert(`Erro ao fazer login: ${mensagemDeErro}`);
        return;
      }

      const dados = await response.json();
      console.log("Login bem-sucedido:", dados);
      alert("Login realizado com sucesso!");

      // Aqui você pode redirecionar o usuário para outra página
      // window.location.href = "outraPagina.html"; // Exemplo de redirecionamento
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição. Tente novamente.");
    }
  });*/

const btn = document.getElementById("btn");

btn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:8080/barbearia");

    if (!response.ok) {
      alert("Erro ao carregar os dados das barbearias.");
      return;
    }

    const barbearias = await response.json();

    const barbeariaEncontrada = barbearias.find(
      (barbearia) => barbearia.emailBarbearia == email && barbearia.senhaBarbearia == senha
    );

    if (barbeariaEncontrada) {

      localStorage.setItem("barbeariaId", barbeariaEncontrada.idBarbearia);

      /*alert(`Barbearia encontrada: ${barbeariaEncontrada.nomeBarbearia}. ID armazenado.`);*/
      window.location.href = "../Minha conta/minhaConta.html";
    } else {
      alert("Email ou senha inválidos.");
    }
  } catch (error) {
    console.error("Erro ao carregar dados das barbearias: ", error);
    alert("Erro ao carregar os dados das barbearias.");
  }
});
/*localStorage.clear()*/