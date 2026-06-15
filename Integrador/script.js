// script.js – monta a página de estoque a partir de ESTOQUE_DATA (dados.js)

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function badgeNivel(nivel) {
  const classes = {
    "Crítico": "nivel-critico",
    "Médio": "nivel-medio",
    "Cheio": "nivel-cheio",
  };
  return `<span class="badge ${classes[nivel] || ""}">${nivel}</span>`;
}

function montarCards(resumo) {
  const container = document.getElementById("cards");
  container.innerHTML = `
    <div class="card">
      <div class="valor">${resumo.total_produtos}</div>
      <div class="label">Total de Produtos</div>
    </div>
    <div class="card">
      <div class="valor cor-critico">${resumo.criticos}</div>
      <div class="label">Estoque Crítico</div>
    </div>
    <div class="card">
      <div class="valor cor-medio">${resumo.medios}</div>
      <div class="label">Estoque Médio</div>
    </div>
    <div class="card">
      <div class="valor cor-cheio">${resumo.cheios}</div>
      <div class="label">Estoque Cheio</div>
    </div>
  `;
}

function montarTabela(produtos) {
  const corpo = document.getElementById("corpo-tabela");
  corpo.innerHTML = produtos.map((p) => `
    <tr>
      <td>${p.Codigo}</td>
      <td class="nome">${p.Produto}</td>
      <td>${p.Qtde_Disponivel}</td>
      <td>${p.Qtde_Reservada}</td>
      <td><strong>${p.Qtde_Livre}</strong></td>
      <td>${formatarMoeda(p.Preco)}</td>
      <td>${formatarMoeda(p.Valor_Total)}</td>
      <td>${badgeNivel(p.Nivel)}</td>
    </tr>
  `).join("");
}

function montarRodape(resumo) {
  document.getElementById("data-atualizacao").textContent = resumo.atualizado_em;
}

function inicializar() {
  montarCards(ESTOQUE_DATA.resumo);
  montarTabela(ESTOQUE_DATA.produtos);
  montarRodape(ESTOQUE_DATA.resumo);
}

document.addEventListener("DOMContentLoaded", inicializar);
