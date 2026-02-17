//Aparecer a tela de criar
const dcriar = document.getElementById('criar')

 function aparecer(){
    dcriar.style.display = 'flex'
}
//Fechar a tela de criar
function fechar(){
    dcriar.style.display = 'none'
}

//Criação do item
const form = document.querySelector("#form");
const inputNome = document.querySelector("#nome");
const selectCategoria = document.querySelector("#categoria");

const itens = JSON.parse(localStorage.getItem("lista")) || [];
itens.forEach(criarItem);

form.addEventListener("submit", e => {
  e.preventDefault();

  const item = {
    nome: inputNome.value,
    categoria: selectCategoria.value,
    id: Date.now()
  };

  itens.push(item);
  localStorage.setItem("lista", JSON.stringify(itens));

  criarItem(item);
  form.reset();
});

function criarItem(item) {
  const div = document.createElement("div");

  div.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${item.nome}</span>
    </label>
    <button onclick="removerItem(${item.id})">X</button>
  `;

  document.getElementById(item.categoria).appendChild(div);
}

function removerItem(id) {
  const index = itens.findIndex(i => i.id === id);
  if (index !== -1) {
    itens.splice(index, 1);
    localStorage.setItem("lista", JSON.stringify(itens));
    location.reload(); // jeito simples de atualizar
  }
}
