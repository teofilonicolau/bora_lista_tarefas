const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
let editTodoId = null; // para rastrear o ID da tarefa a ser editada

// carregar tarefas do localStorage ao abrir a aplicaçao
const todos = JSON.parse(localStorage.getItem('todos')) || [];
if (todos.length) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = input.value.trim();

    if (editTodoId) {
        // Atualizar tarefa existente
        updateTodo(editTodoId, todoText);
    } else {
        // Adicionar nova tarefa
        addTodoToList({ text: todoText });
    }

    input.value = '';
    editTodoId = null; // reiniciar apos a adição ou atualizaçao
});

function addTodo(todo) {
    const todoEl = document.createElement('li');
    todoEl.innerText = todo.text;
    todoEl.classList.add('flex', 'justify-between', 'items-center', 'border', 'border-gray-300', 'rounded-lg', 'p-2', 'mb-2');

    // botão de ediçao
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.classList.add('ml-2', 'bg-yellow-500', 'text-white', 'px-2', 'py-1', 'rounded');
    editButton.addEventListener('click', () => {
        input.value = todo.text; // Preencher o input com o texto da tarefa
        editTodoId = todo.id; // Definir o ID da tarefa a ser editada
    });

    // botao de exclusao
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Deletar';
    deleteButton.classList.add('ml-2', 'bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
    deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
    });

    todoEl.appendChild(editButton);
    todoEl.appendChild(deleteButton);
    todosUL.appendChild(todoEl);
}

function updateTodo(id, text) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos[todoIndex].text = text;
    updateLS(); // atualiza o localStorage apos a edição
    renderTodos(); // re-renderizar a lista
}

function deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos.splice(todoIndex, 1); // Remover a tarefa
    updateLS(); // atualiza o localStorage apos a exclusão
    renderTodos(); // re-renderizar a lista
}

function renderTodos() {
    todosUL.innerHTML = ''; // Limpar a lista atual
    todos.forEach(todo => addTodo(todo)); // Re-adicionar tarefas
}

function updateLS() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Adiciona a tarefa ao array de todos
function addTodoToList(todo) {
    const newTodo = {
        id: Date.now(), // ID unico para a tarefa
        text: todo.text,
        completed: false
    };
    todos.push(newTodo);
    updateLS(); // Atualiza o localStorage apos a adiçao
    addTodo(newTodo);
}
