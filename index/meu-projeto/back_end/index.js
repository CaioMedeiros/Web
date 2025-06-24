const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let alunos = [
  { id: 1, nome: 'André', curso: 'Nutrição', ira: 9.5 },
  { id: 2, nome: 'Breno', curso: 'Educação Fisica', ira: 7.2 },
  { id: 3, nome: 'Caio', curso: 'Engenharia de software', ira: 8.0 }
];
let nextId = 4;

// Listar alunos
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Criar aluno
app.post('/alunos', (req, res) => {
  const { nome, curso, ira } = req.body;
  const novoAluno = { id: nextId++, nome, curso, ira };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// Editar aluno
app.put('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, curso, ira } = req.body;

  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });

  aluno.nome = nome;
  aluno.curso = curso;
  aluno.ira = ira;
  res.json(aluno);
});

// Apagar aluno
app.delete('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  alunos = alunos.filter(a => a.id !== id);
  res.status(204).send();
});

// Buscar um aluno por ID (para edição)
app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
  res.json(aluno);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
