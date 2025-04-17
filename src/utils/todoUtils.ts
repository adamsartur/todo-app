import { TodoEntry, TodoList } from '../types/todo';

export const isValidTodo = (todo: any): todo is TodoEntry => {
  if (!todo) return false;
  
  if (
    typeof todo.id !== 'number' || 
    typeof todo.content !== 'string' || 
    typeof todo.checked !== 'boolean'
  ) {
    return false;
  }
  
  if (!todo.content.trim()) {
    return false;
  }
  
  return true;
};

export const filterValidTodos = (todos: any[]): TodoList => {
  if (!Array.isArray(todos)) {
    console.error('Invalid todos data: not an array', todos);
    return [];
  }
  
  const validTodos = todos.filter(todo => {
    const isValid = isValidTodo(todo);
    if (!isValid) {
      console.error('Invalid todo entry found and filtered out:', todo);
    }
    return isValid;
  });
  
  return validTodos;
};

export const safeParseJSON = (jsonData: string): TodoList => {
  try {
    const parsed = JSON.parse(jsonData);
    
    if (!parsed || !Array.isArray(parsed.todos)) {
      console.error('Invalid JSON structure for todos', parsed);
      return [];
    }
    
    return filterValidTodos(parsed.todos);
  } catch (error) {
    console.error('Failed to parse JSON data:', error);
    return [];
  }
};

export const sortTodos = (todos: TodoList): TodoList => {
  return [...todos].sort((a, b) => {
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1;
    }
    return b.id - a.id;
  });
};
