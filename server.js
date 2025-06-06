const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 5000;

app.use(express.json()); // lets your server read JSON body

let students = require('./data/students');

// Home route
app.get('/', (req, res) => {
  res.send('🎉 Student Management Backend is Running!');
});

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Get one student
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

// Add new student
app.post('/api/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  students[index] = { ...students[index], ...req.body };
  res.json(students[index]);
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: 'Student deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
