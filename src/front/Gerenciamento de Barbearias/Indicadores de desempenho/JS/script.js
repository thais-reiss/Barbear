
window.addEventListener('DOMContentLoaded', async () => {
  let idBarbearia = localStorage.getItem("barbeariaId");


  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1;

  try {
    const indicadorAgendamentos = await fetch(`http://localhost:8080/indicadores/agendamentos/${idBarbearia}?mes=${mesAtual}`);

    if (!indicadorAgendamentos.ok) {
      alert("Erro ao carregar os dados da barbearia.");
      return;
    }

    const agendamentos = await indicadorAgendamentos.json();
    const indicadorAgendamento = document.getElementById("textoAgendamentos");
    indicadorAgendamento.innerHTML = `<span>${agendamentos}</span>`;

    const indicadorAvaliacoes = await fetch(`http://localhost:8080/indicadores/avaliacoes/${idBarbearia}`);
    if (!indicadorAvaliacoes.ok) {
      alert("Erro ao carregar os dados da barbearia.");
      return;
    }
    const avaliacoes = await indicadorAvaliacoes.json();
    const avaliacaoFormatada = parseFloat(avaliacoes).toFixed(2);
    const indicadorAvaliacao = document.getElementById("textoAvaliacoes");
    indicadorAvaliacao.innerHTML = `<span>${avaliacaoFormatada}%</span>`;


    const anoAtual = dataAtual.getFullYear();
    const indicadorPopularidadeServico = await fetch(`http://localhost:8080/indicadores/servicos/popularidade/${idBarbearia}?mes=${mesAtual}&ano=${anoAtual}`);
    if (!indicadorPopularidadeServico.ok) {
      alert("Erro ao carregar os dados dos serviços da barbearia.");
      return;
    }

    const popularidade = await indicadorPopularidadeServico.json();
    const txtIndicador = document.getElementById("textoPopularidadeServicos");

    if (Object.keys(popularidade).length === 0) {
      txtIndicador.innerHTML = `<span>Nenhum serviço atingiu a popularidade mínima de 10 agendamentos no mês ${mesAtual}.</span>`;
    } else {
      const listaServicos = Object.entries(popularidade)
        .map(
          ([nomeServico, agendamentos]) =>
            `<li>${nomeServico}: ${agendamentos} agendamentos</li>`
        )
        .join("");
      txtIndicador.innerHTML = `<span>${listaServicos}</span>`;
      }
    } catch (error) {
      console.error("Erro ao carregar os indicadores: ", error);
      alert("Erro ao carregar os indicadores.");
    }
  });

