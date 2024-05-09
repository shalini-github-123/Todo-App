import { createContext, useReducer } from 'react';

export const TodosContext = createContext(); // Change context name to TodosContext

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        todos: action.payload
      };
    case 'CREATE_TODO':
      return {
        todos: [action.payload, ...state.todos]
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload)
      };
    case 'UPDATE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        )
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo._id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
};


export const TodosContextProvider = ({ children }) => { // Change context name to TodosContextProvider
  const [state, dispatch] = useReducer(todosReducer, { // Change reducer name to todosReducer
    todos: null // Change state property name to todos
  });

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}> {/* Change context name to TodosContext */}
      { children }
    </TodosContext.Provider>
  );
};
