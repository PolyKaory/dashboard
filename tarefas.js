// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// --- CARREGAR TAREFAS DO LOCALSTORAGE ---
// Pega as tarefas salvas ou inicia um array vazio se não houver nada
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// --- FUNÇÃO PARA SALVAR TAREFAS NO LOCALSTORAGE ---
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- FUNÇÃO PARA RENDERIZAR AS TAREFAS NA TELA ---
function renderTasks() {
  // Limpa a lista atual para evitar duplicatas
  todoList.innerHTML = '';

  // Cria um elemento <li> para cada tarefa no array
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.dataset.index = index; // Adiciona o índice como um data attribute

    // Adiciona a classe 'completed' se a tarefa estiver concluída
    if (task.completed) {
      li.classList.add('completed');
    }

    // Cria o botão de deletar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×'; // Símbolo de multiplicação como 'X'
    deleteBtn.classList.add('delete-btn');

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

// --- FUNÇÃO PARA ADICIONAR UMA NOVA TAREFA ---
function addTask(e) {
  e.preventDefault(); // Impede o formulário de recarregar a página

  const taskText = todoInput.value.trim(); // Pega o texto e remove espaços extras

  if (taskText !== '') {
    // Adiciona a nova tarefa ao array
    tasks.push({ text: taskText, completed: false });
    
    // Salva e renderiza a lista atualizada
    saveTasks();
    renderTasks();
    
    // Limpa o campo de input
    todoInput.value = '';
  }
}

// --- FUNÇÃO PARA GERENCIAR CLIQUES NA LISTA (DELETAR/CONCLUIR) ---
function handleListClick(e) {
  const target = e.target;
  const li = target.closest('li'); // Encontra o elemento <li> mais próximo

  if (!li) return; // Se o clique não foi em um <li>, ignora

  const index = li.dataset.index;

  // Se o botão de deletar foi clicado
  if (target.classList.contains('delete-btn')) {
    tasks.splice(index, 1); // Remove a tarefa do array pelo índice
  } 
  // Se qualquer outra parte do <li> foi clicada
  else {
    tasks[index].completed = !tasks[index].completed; // Inverte o status de 'completed'
  }
  
  // Salva e renderiza a lista atualizada
  saveTasks();
  renderTasks();
}


// --- EVENT LISTENERS ---
todoForm.addEventListener('submit', addTask);
todoList.addEventListener('click', handleListClick);

// --- INICIALIZAÇÃO ---
// Renderiza as tarefas assim que a página é carregada
renderTasks();