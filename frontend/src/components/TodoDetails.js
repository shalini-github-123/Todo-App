import { useState } from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import UpdateTodoForm from './UpdateTodoForm'; 
import format from 'date-fns/format'; 


const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const [isUpdating, setIsUpdating] = useState(false); 

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_TODO', payload: todo._id });
      } else {
        
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true); 
  };

  const handleComplete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${todo._id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
      } else {
       
      }
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };

  return (
    <div className={`todo-details ${todo.status === 'completed' ? 'completed' : ''}`}>
      {isUpdating ? (
        <UpdateTodoForm todo={todo} onClose={() => setIsUpdating(false)} />
      ) : (
        <>
          <h4>{todo.task}</h4>
          <p><strong>Priority:</strong> {todo.priority}</p>
          <p><strong>Deadline:</strong> {format(new Date(todo.deadline), 'MM/dd/yyyy')}</p> 
          <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
          <div className="buttons">
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
            <span className="material-symbols-outlined" onClick={handleUpdate}>update</span>
            <button className={`complete-button ${todo.status === 'completed' ? 'completed' : ''}`} onClick={handleComplete}>{todo.status === 'completed' ? 'Completed' : 'Incomplete'}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoDetails;
