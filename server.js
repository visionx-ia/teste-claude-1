const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const DB_FILE = path.join(__dirname, 'todos.json');

// Persistência simples em JSON
function readDB() {
  if (!fs.existsSync(DB_FILE)) return { todos: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET todos (com filtro opcional)
app.get('/api/todos', (req, res) => {
  const { filter } = req.query;
  let { todos } = readDB();
  if (filter === 'active')    todos = todos.filter(t => !t.completed);
  if (filter === 'completed') todos = todos.filter(t => t.completed);
  // Ativos primeiro, depois concluídos; mais recentes no topo
  todos.sort((a, b) => a.completed - b.completed || b.id - a.id);
  res.json(todos);
});

// POST novo todo
app.post('/api/todos', (req, res) => {
  const { title, priority = 'normal' } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: 'Título obrigatório' });
  const db = readDB();
  const todo = {
    id: db.nextId++,
    title: title.trim(),
    completed: false,
    priority,
    created_at: new Date().toISOString(),
  };
  db.todos.push(todo);
  writeDB(db);
  res.status(201).json(todo);
});

// PATCH atualizar todo
app.patch('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = readDB();
  const todo = db.todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Não encontrado' });

  const { completed, title, priority } = req.body;
  if (title     !== undefined) todo.title     = title.trim();
  if (completed !== undefined) todo.completed = completed;
  if (priority  !== undefined) todo.priority  = priority;

  writeDB(db);
  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = readDB();
  const idx = db.todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });
  db.todos.splice(idx, 1);
  writeDB(db);
  res.json({ success: true });
});

// DELETE todos concluídos
app.delete('/api/todos/completed/all', (req, res) => {
  const db = readDB();
  const before = db.todos.length;
  db.todos = db.todos.filter(t => !t.completed);
  writeDB(db);
  res.json({ deleted: before - db.todos.length });
});

// Stats
app.get('/api/stats', (req, res) => {
  const { todos } = readDB();
  const completed = todos.filter(t => t.completed).length;
  res.json({ total: todos.length, completed, active: todos.length - completed });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  let localIP = 'localhost';
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        localIP = alias.address;
        break;
      }
    }
  }
  console.log(`\n✅ Servidor rodando!`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Celular: http://${localIP}:${PORT}\n`);
});
