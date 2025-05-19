const btn = document.getElementById("btn");

btn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:8080/cliente");

    if (!response.ok) {
      alert("Erro ao carregar os dados dos clientes.");
      return;
    }

    const clientes = await response.json();
    
    const clienteEncontrado = clientes.find(
      (cliente) => cliente.emailCliente == email && cliente.senhaCliente == senha
    );

    if (clienteEncontrado) {

      localStorage.setItem("clienteId", clienteEncontrado.idCliente);

      //alert(`Cliente encontrado: ${clienteEncontrado.nomeCliente}. ID armazenado.`);
      window.location.href = "../Minha conta/contaCliente.html";
    } else {
      alert("Email ou senha inválidos.");
    }
  } catch (error) {
    console.error("Erro ao carregar dados dos clientes: ", error);
    //alert("Erro ao carregar os dados dos clientes.");
  }
});
/*localStorage.clear()*/