const todoList    = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addBtn      = document.getElementById('add-btn');
const filterBtns  = document.querySelectorAll('.filter');
const clearBtn    = document.getElementById('clear-completed');
const footer      = document.getElementById('footer');
const statActive  = document.getElementById('stat-active');
const statCompleted = document.getElementById('stat-completed');
const prioritySelect = document.getElementById('priority-select');
const priorityMenu   = document.getElementById('priority-menu');
const priorityDot    = document.getElementById('priority-dot');
const toast       = document.getElementById('toast');

let currentFilter = 'all';
let currentPriority = 'normal';
let toastTimer;

// Inicializa
loadTodos();
updateStats();

// Eventos de input
addBtn.addEventListener('click', addTodo);
newTodoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

// Menu de prioridade
prioritySelect.addEventListener('click', e => {
  e.stopPropagation();
  priorityMenu.classList.toggle('hidden');
});

document.querySelectorAll('.p-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    currentPriority = btn.dataset.p;
    priorityDot.className = `priority-dot ${currentPriority}`;
    priorityMenu.classList.add('hidden');
    newTodoInput.focus();
  });
});

document.addEventListener('click', () => priorityMenu.classList.add('hidden'));

// Filtros
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    loadTodos();
  });
});

// Limpar concluídas
clearBtn.addEventListener('click', async () => {
  const res = await fetch('/api/todos/completed/all', { method: 'DELETE' });
  const data = await res.json();
  if (data.deleted > 0) {
    showToast(`${data.deleted} tarefa(s) removida(s)`);
    loadTodos();
    updateStats();
  }
});

// API helpers
async function api(path, method = 'GET', body) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function loadTodos() {
  const todos = await api(`/api/todos?filter=${currentFilter}`);
  renderTodos(todos);
  updateStats();
}

async function updateStats() {
  const stats = await api('/api/stats');
  statActive.textContent = `${stats.active} ativa${stats.active !== 1 ? 's' : ''}`;
  statCompleted.textContent = `${stats.completed} concluída${stats.completed !== 1 ? 's' : ''}`;
  footer.classList.toggle('hidden', stats.completed === 0);
}

async function addTodo() {
  const title = newTodoInput.value.trim();
  if (!title) { newTodoInput.focus(); return; }
  await api('/api/todos', 'POST', { title, priority: currentPriority });
  newTodoInput.value = '';
  currentPriority = 'normal';
  priorityDot.className = 'priority-dot normal';
  loadTodos();
}

async function toggleTodo(id, completed) {
  await api(`/api/todos/${id}`, 'PATCH', { completed: !completed });
  loadTodos();
}

async function deleteTodo(id, el) {
  el.classList.add('removing');
  el.addEventListener('animationend', async () => {
    await api(`/api/todos/${id}`, 'DELETE');
    loadTodos();
  }, { once: true });
}

async function saveTitle(id, el, newTitle) {
  if (!newTitle.trim()) { loadTodos(); return; }
  await api(`/api/todos/${id}`, 'PATCH', { title: newTitle.trim() });
  updateStats();
}

function renderTodos(todos) {
  if (todos.length === 0) {
    const messages = {
      all: ['📋', 'Nenhuma tarefa ainda', 'Adicione algo acima para começar'],
      active: ['✅', 'Tudo em dia!', 'Nenhuma tarefa pendente'],
      completed: ['🎯', 'Nada concluído ainda', 'Complete alguma tarefa primeiro'],
    };
    const [icon, title, sub] = messages[currentFilter];
    todoList.innerHTML = `
      <li class="empty">
        <div class="empty-icon">${icon}</div>
        <p><strong>${title}</strong></p>
        <p>${sub}</p>
      </li>`;
    return;
  }

  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item priority-${todo.priority}${todo.completed ? ' completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-check" role="checkbox" aria-checked="${!!todo.completed}" tabindex="0"></div>
      <span class="todo-title" contenteditable="false">${escapeHtml(todo.title)}</span>
      <button class="todo-delete" aria-label="Remover">✕</button>
    `;

    const check = li.querySelector('.todo-check');
    const titleEl = li.querySelector('.todo-title');
    const deleteBtn = li.querySelector('.todo-delete');

    check.addEventListener('click', () => toggleTodo(todo.id, !!todo.completed));
    check.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') toggleTodo(todo.id, !!todo.completed); });

    deleteBtn.addEventListener('click', () => deleteTodo(todo.id, li));

    // Edição inline (duplo toque / double click)
    titleEl.addEventListener('dblclick', () => startEdit(titleEl, todo.id));
    titleEl.addEventListener('touchstart', handleTouchEdit(titleEl, todo.id), { passive: true });

    titleEl.addEventListener('blur', () => {
      if (titleEl.contentEditable === 'true') {
        titleEl.contentEditable = 'false';
        saveTitle(todo.id, li, titleEl.textContent);
      }
    });

    titleEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); titleEl.blur(); }
      if (e.key === 'Escape') { titleEl.textContent = escapeHtml(todo.title); titleEl.blur(); }
    });

    todoList.appendChild(li);
  });
}

function startEdit(el, id) {
  el.contentEditable = 'true';
  el.focus();
  // Coloca cursor no final
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
}

function handleTouchEdit(el, id) {
  let tapTimer;
  return () => {
    if (tapTimer) {
      clearTimeout(tapTimer);
      tapTimer = null;
      startEdit(el, id);
    } else {
      tapTimer = setTimeout(() => { tapTimer = null; }, 300);
    }
  };
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
