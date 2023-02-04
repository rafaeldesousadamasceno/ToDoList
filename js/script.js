let tarefa = document.getElementById('txttarefa');
let btnAdicionar = document.getElementById('adicionar');
let lista = document.querySelector('ul');

var itensDaLista = [];

btnAdicionar.addEventListener('click', () => {    
    if(tarefa.value != "") {
        adicionarItensNaLista();
        tarefa.focus();
    }
})

tarefa.addEventListener('keypress', e => {
    if(e.key == 'Enter' && tarefa.value != '') {
        adicionarItensNaLista();
        tarefa.focus();
    }
})

function adicionarItensNaLista() {
    itensDaLista.push({ 'item': tarefa.value, 'status': '' });
    atualizarStatus();
}

function atualizarStatus() {
    localStorage.setItem('toDoList', JSON.stringify(itensDaLista));
    carregandoItens();
}

function carregandoItens() {
    lista.innerHTML = "";
    itensDaLista = JSON.parse(localStorage.getItem('toDoList')) ?? [];
    itensDaLista.forEach((item, i) => {
        inserirItemNaTela(item.item, item.status, i)
    });
}

function inserirItemNaTela(item, status, i){
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="card">
            <input type="checkbox" ${status} data-i=${i} onchange="concluir(this, ${i})">
            <span data-si=${i}>${item}</span>
            <button onclick="removerItem(${i})" data-i=${i}>Deletar</button>
        </div>
    `;

    lista.appendChild(li);

    if(status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('riscar-tarefa');
    } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('riscar-tarefa');
    }

    tarefa.value = "";
}

function concluir(check, i) {
    if (check.checked) {
        itensDaLista[i].status = 'checked';
    } else {
        itensDaLista[i].status = '';
    }

    atualizarStatus();
}

function removerItem(i) {
    itensDaLista.splice(i, 1);
    atualizarStatus();
}

carregandoItens();