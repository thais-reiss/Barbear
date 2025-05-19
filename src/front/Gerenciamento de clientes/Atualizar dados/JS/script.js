/*const idCliente = prompt("Digite o ID do cliente que deseja atualizar:");

function getIdClienteDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
const idCliente = getIdClienteDaURL();*/

const idCliente = localStorage.getItem("clienteId");

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`http://localhost:8080/cliente/${idCliente}`);

        if (!response.ok) {
            alert("Erro ao carregar os dados do cliente.");
            return;
        }
        const cliente = await response.json();

        document.getElementById("NomeCliente").value = cliente.nomeCliente || "";
        document.getElementById("EmailCliente").value = cliente.emailCliente || "";
        document.getElementById("TelefoneCliente").value = cliente.telefoneCliente || "";
        document.getElementById("SenhaCliente").value = cliente.senhaCliente || "";

    } catch (error) {
        console.error("Erro ao carregar dados do cliente a ser alterado: ", error);
        alert("Erro ao carregar os dados do cliente.");
    }
});

document
    .getElementById("botaoAlterar")
    .addEventListener("click", async function () {
        const nome = document.getElementById("NomeCliente").value;
        const email = document.getElementById("EmailCliente").value;
        const telefone = document.getElementById("TelefoneCliente").value;
        const senha = document.getElementById("SenhaCliente").value;

        if (!validacao(nome, email, telefone, senha)) {
            return;
        } 

        const dadosCliente = {
            nomeCliente: nome,
            emailCliente: email,
            telefoneCliente: telefone,
            senhaCliente: senha,
        };

        try {
            const response = await fetch(
                `http://localhost:8080/cliente/${idCliente}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dadosCliente),
                }
            );

            if (!response.ok) {
                const mensagemDeErro = await response.text();
                console.error("Erro ao alterar dados do cliente: ", mensagemDeErro);
                alert("Erro ao alterar dados do cliente.");
                return;
            }

            const dados = await response.json();
            alert("Cliente alterado com sucesso!");
            //console.log(dados);
            window.location.href = "../Minha conta/contaCliente.html";
        } catch (error) {
            console.error("Erro na requisição.", error);
            alert("Erro na requisição. Verifique sua conexão e tente novamente.");
        } finally {
            document.getElementById("NomeCliente").value = "";
            document.getElementById("EmailCliente").value = "";
            document.getElementById("TelefoneCliente").value = "";
            document.getElementById("SenhaCliente").value = "";
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