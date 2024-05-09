import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from '../hooks/useAuthContext';

const TodoForm = () => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    if (!task || !priority || !deadline) {
      setEmptyFields(['task', 'priority', 'deadline']);
      setError('Please fill in all the fields');
      return;
    }

    const todo = { task, priority, deadline };

    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTask('');
      setPriority('');
      setDeadline('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_TODO', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Todo</h3>

      <label>Task:</label>
      <input 
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        className={emptyFields && emptyFields.includes('task') ? 'error' : ''} 
      />

      <label>Priority:</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={emptyFields && emptyFields.includes('priority') ? 'error' : ''} 
      >
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Deadline:</label>
      <input 
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        className={emptyFields && emptyFields.includes('deadline') ? 'error' : ''} 
      />

      <button>Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TodoForm;
