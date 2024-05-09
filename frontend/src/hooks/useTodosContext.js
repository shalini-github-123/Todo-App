import { TodosContext } from '../context/TodosContext'; // Import TodosContext instead of WorkoutsContext
import { useContext } from 'react';

export const useTodosContext = () => { // Rename the hook to useTodosContext
  const context = useContext(TodosContext); // Use TodosContext instead of WorkoutsContext

  if (!context) {
    throw Error('useTodosContext must be used inside a TodosContextProvider'); // Update error message
  }

  return context;
};
