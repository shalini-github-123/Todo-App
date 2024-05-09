import { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

const UpdateTodoForm = ({ todo, onClose }) => {
  const [task, setTask] = useState(todo.task);
  const [priority, setPriority] = useState(todo.priority);
  const [deadline, setDeadline] = useState(todo.deadline);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ task, priority, deadline })
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        // Update the todo details in the UI
        // You can dispatch an action to update the todo in the context
        // Or update the todo directly if it's stored in component state
        onClose(); // Close the update form
      } else {
        // Handle error response
        setError('Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo');
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <h3>Update Todo</h3>
      <label>Task:</label>
      <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <label>Priority:</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Deadline:</label>
      <input 
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Update</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateTodoForm;
