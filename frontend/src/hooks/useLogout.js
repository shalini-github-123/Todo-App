import { useAuthContext } from './useAuthContext';
import { useTodosContext } from './useTodosContext'; // Import useTodosContext instead of useWorkoutsContext

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchTodos } = useTodosContext(); // Destructure dispatch from useTodosContext

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });

    // Set todos to null upon logout
    dispatchTodos({ type: 'SET_TODOS', payload: null }); // Change action type to SET_TODOS
  };

  return { logout };
};
