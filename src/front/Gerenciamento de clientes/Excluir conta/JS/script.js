/*function getIdClienteDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
const idCliente = getIdClienteDaURL();*/
const idCliente = localStorage.getItem("clienteId");

document.getElementById("btnExcluir").addEventListener("click", async (ev) => {
    ev.preventDefault();
    if (idCliente) {
        fetch(`http://localhost:8080/cliente/${idCliente}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert("Sua conta foi exluída com sucesso.");
                    document.getElementById('input-excluir').value = '';
                    window.location.href = "../../HomePage/index.html";
                } else {
                    response.text().then(errorMessage => {
                        alert(`Erro: ${errorMessage}`);
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao excluir cliente:", error);
                alert("Ocorreu um erro ao tentar excluir a sua conta.");
            });
    } else {
        alert("Por favor, insira um ID válido.");
    }
});
