document.addEventListener('DOMContentLoaded', () => {
    const todos = document.querySelector('.todos');
    const addButton = document.querySelector('.btn-add');
    const inputField = document.querySelector('.input-task');

    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    todos.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('trash-bin')) {
            deleteTodo(target.closest('.todo'));
        }
        if (target.classList.contains('checkbox')) {
            toggleCompleted(target);
        }
    });

    function createTodoElement(text) {
        const todo = document.createElement('div');
        todo.className = 'todo';
        todo.innerHTML = `
            <input type="checkbox" class="checkbox">
            <p class="task-name">${text}</p>
            <img src="../../res/trash-bin.jpg" alt="Delete todo" class="trash-bin">
        `;
        return todo;
    }

    function addTodo() {
        const text = inputField.value.trim();
        if (text === '') return;

        const newTodo = createTodoElement(text);
        todos.appendChild(newTodo);
        inputField.value = '';

    }

    function deleteTodo(todo) {
        todo.remove();
    }

    function toggleCompleted(checkbox) {
        const taskParagraph = checkbox.nextElementSibling;
        taskParagraph.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    }
});