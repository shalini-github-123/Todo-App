const express = require('express');
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
  toggleStatus
} = require('../controllers/todoController'); // Import the adapted controller functions
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all todo routes
router.use(requireAuth);

// GET all todos
router.get('/', getTodos);

// GET a single todo
router.get('/:id', getTodo);

// POST a new todo
router.post('/', createTodo);

// DELETE a todo
router.delete('/:id', deleteTodo);

// UPDATE a todo
router.patch('/:id', updateTodo);

// TOGGLE status of a todo
router.patch('/:id/toggle', toggleStatus);

module.exports = router;
