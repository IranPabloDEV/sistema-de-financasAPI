const API_URL = "https://sistema-de-financasapi.onrender.com/gastos";

let gastos = [];

// TOAST

function mostrarMensagem(texto) {
  const toast = document.getElementById("toast");

  toast.textContent = texto;

  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 3000);
}

// TEMA ESCURO

const botaoTema = document.getElementById("toggleTheme");

if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      botaoTema.textContent = "☀️ Modo Claro";
    } else {
      botaoTema.textContent = "🌙 Modo Escuro";
    }
  });
}

// CARREGAR GASTOS

async function carregarGastos() {
  try {
    const resposta = await fetch(API_URL);

    gastos = await resposta.json();

    atualizarTela();
  } catch (erro) {
    console.error("Erro ao carregar gastos:", erro);
  }
}

// ADICIONAR GASTO

async function adicionarGasto() {
  const descricao = document.getElementById("descricao").value;

  const valor = document.getElementById("valor").value;

  const categoria = document.getElementById("categoria").value;

  if (!descricao || !valor || !categoria) {
    mostrarMensagem("Preencha todos os campos");

    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        descricao,
        valor,
        categoria,
      }),
    });

    mostrarMensagem("Gasto cadastrado com sucesso");

    document.getElementById("descricao").value = "";

    document.getElementById("valor").value = "";

    document.getElementById("categoria").value = "";

    carregarGastos();
  } catch (erro) {
    console.error(erro);

    mostrarMensagem("Erro ao cadastrar gasto");
  }
}

// EXCLUIR GASTO

async function excluirGasto(id) {
  try {
    await fetch(
      `${API_URL}/${id}`,

      {
        method: "DELETE",
      },
    );

    mostrarMensagem("Gasto removido com sucesso");

    carregarGastos();
  } catch (erro) {
    console.error(erro);
  }
}

// EDITAR GASTO

async function editarGasto(id) {
  const gasto = gastos.find((g) => g._id === id);

  if (!gasto) return;

  const novaDescricao = prompt("Descrição", gasto.descricao);

  const novoValor = prompt("Valor", gasto.valor);

  const novaCategoria = prompt("Categoria", gasto.categoria);

  if (!novaDescricao || !novoValor || !novaCategoria) {
    return;
  }

  try {
    await fetch(
      `${API_URL}/${id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          descricao: novaDescricao,

          valor: Number(novoValor),

          categoria: novaCategoria,
        }),
      },
    );

    mostrarMensagem("Gasto atualizado com sucesso");

    carregarGastos();
  } catch (erro) {
    console.error(erro);
  }
}

// ATUALIZAR TELA

function atualizarTela() {
  const tabela = document.getElementById("tabelaGastos");

  tabela.innerHTML = "";

  let total = 0;

  gastos.forEach((gasto) => {
    total += Number(gasto.valor);

    tabela.innerHTML += `

        <tr>

            <td>
                ${gasto.descricao}
            </td>

            <td>
                R$ ${Number(gasto.valor).toFixed(2)}
            </td>

            <td>
                ${gasto.categoria}
            </td>

            <td>

                <button
                    class="editar"
                    onclick="editarGasto('${gasto._id}')">

                    ✏️

                </button>

                <button
                    class="excluir"
                    onclick="excluirGasto('${gasto._id}')">

                    🗑️

                </button>

            </td>

        </tr>

        `;
  });

  document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;

  document.getElementById("quantidade").textContent = gastos.length;
}

// INICIAR SISTEMA

carregarGastos();
