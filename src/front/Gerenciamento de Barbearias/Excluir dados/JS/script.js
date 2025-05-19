let idBarbearia = localStorage.getItem("barbeariaId");

document.getElementById("btnExcluir").addEventListener("click", function (event) {
    event.preventDefault();
    /*const idBarbearia = prompt("Digite o ID da barbearia que deseja excluir:");*/
    if (idBarbearia) {
        fetch(`http://localhost:8080/barbearia/${idBarbearia}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert("Barbearia excluída com sucesso!");
                document.getElementById('input-excluir').value = ''
                window.location.href = "../../HomePage/index.html";
            } else {
                response.text().then(errorMessage => {
                    alert(`Erro: ${errorMessage}`);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao excluir barbearia:", error);
            alert("Ocorreu um erro ao tentar excluir a barbearia.");
        });
    } else {
        alert("Por favor, insira um ID válido.");
    }
});
