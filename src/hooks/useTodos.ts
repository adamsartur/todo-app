import { useState, useEffect, useCallback } from 'react';
import { TodoEntry, TodoList } from '../types/todo';
import { sortTodos, filterValidTodos } from '../utils/todoUtils';

interface TodoState {
  todos: TodoList;
  editingTodoId: number | null;
  history: TodoList[];
  currentIndex: number;
  isUndoRedoOperation: boolean;
}

export const useTodos = (initialTodos: any[] = []) => {
  const [state, setState] = useState<TodoState>({
    todos: [],
    editingTodoId: null,
    history: [],
    currentIndex: -1,
    isUndoRedoOperation: false
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      if (initialTodos && initialTodos.length > 0) {
        const validTodos = filterValidTodos(initialTodos);
        console.log(validTodos);
        const sortedTodos = sortTodos(validTodos);
        
        setState(prev => ({
          ...prev,
          todos: sortedTodos,
          history: [sortedTodos],
          currentIndex: 0
        }));
        
        setError(null);
      }
    } catch (err) {
      console.error('Error initializing todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [initialTodos]);
  
  const addTodo = useCallback((content: string) => {
    if (!content.trim()) {
      setError('Todo content cannot be empty');
      return;
    }
    
    setState(prev => {
      const newTodo: TodoEntry = {
        id: Date.now(),
        content: content.trim(),
        checked: false
      };
      
      const updatedTodos = sortTodos([...prev.todos, newTodo]);
      
      let newHistory = prev.history;
      let newIndex = prev.currentIndex;
      
      if (!prev.isUndoRedoOperation) {
        newHistory = prev.history.slice(0, prev.currentIndex + 1);
        newHistory.push(updatedTodos);
        newIndex = newHistory.length - 1;
      }
      
      return {
        ...prev,
        todos: updatedTodos,
        history: newHistory,
        currentIndex: newIndex,
        isUndoRedoOperation: false
      };
    });
    
    setError(null);
  }, []);
  
  const toggleTodo = useCallback((id: number) => {
    setState(prev => {
      const updatedTodos = prev.todos.map(todo => 
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      );
      
      const sortedTodos = sortTodos(updatedTodos);
      
      let newHistory = prev.history;
      let newIndex = prev.currentIndex;
      
      if (!prev.isUndoRedoOperation) {
        newHistory = prev.history.slice(0, prev.currentIndex + 1);
        newHistory.push(sortedTodos);
        newIndex = newHistory.length - 1;
      }
      
      return {
        ...prev,
        todos: sortedTodos,
        history: newHistory,
        currentIndex: newIndex,
        isUndoRedoOperation: false
      };
    });
  }, []);
  
  const removeTodo = useCallback((id: number) => {
    setState(prev => {
      const updatedTodos = prev.todos.filter(todo => todo.id !== id);
      
      let newHistory = prev.history;
      let newIndex = prev.currentIndex;
      
      if (!prev.isUndoRedoOperation) {
        newHistory = prev.history.slice(0, prev.currentIndex + 1);
        newHistory.push(updatedTodos);
        newIndex = newHistory.length - 1;
      }
      
      return {
        ...prev,
        todos: updatedTodos,
        editingTodoId: prev.editingTodoId === id ? null : prev.editingTodoId,
        history: newHistory,
        currentIndex: newIndex,
        isUndoRedoOperation: false
      };
    });
  }, []);
  
  const startEditingTodo = useCallback((id: number) => {
    setState(prev => ({
      ...prev,
      editingTodoId: id
    }));
  }, []);
  
  const cancelEditingTodo = useCallback(() => {
    setState(prev => ({
      ...prev,
      editingTodoId: null
    }));
  }, []);
  
  const updateTodoContent = useCallback((id: number, content: string) => {
    if (!content.trim()) {
      setError('Todo content cannot be empty');
      return;
    }
    
    setState(prev => {
      const updatedTodos = prev.todos.map(todo => 
        todo.id === id ? { ...todo, content: content.trim() } : todo
      );
      
      let newHistory = prev.history;
      let newIndex = prev.currentIndex;
      
      if (!prev.isUndoRedoOperation) {
        newHistory = prev.history.slice(0, prev.currentIndex + 1);
        newHistory.push(updatedTodos);
        newIndex = newHistory.length - 1;
      }
      
      return {
        ...prev,
        todos: updatedTodos,
        editingTodoId: null,
        history: newHistory,
        currentIndex: newIndex,
        isUndoRedoOperation: false
      };
    });
    
    setError(null);
  }, []);
  
  const undo = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex <= 0) {
        return prev;
      }
      
      const newIndex = prev.currentIndex - 1;
      
      return {
        ...prev,
        todos: prev.history[newIndex],
        currentIndex: newIndex,
        editingTodoId: null,
        isUndoRedoOperation: true
      };
    });
  }, []);
  
  const redo = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex >= prev.history.length - 1) {
        return prev;
      }
      
      const newIndex = prev.currentIndex + 1;
      
      return {
        ...prev,
        todos: prev.history[newIndex],
        currentIndex: newIndex,
        editingTodoId: null,
        isUndoRedoOperation: true
      };
    });
  }, []);
  
  const canUndo = state.currentIndex > 0;
  const canRedo = state.currentIndex < state.history.length - 1;
  
  return {
    todos: state.todos,
    isLoading,
    error,
    editingTodoId: state.editingTodoId,
    canUndo,
    canRedo,
    addTodo,
    toggleTodo,
    removeTodo,
    startEditingTodo,
    cancelEditingTodo,
    updateTodoContent,
    undo,
    redo
  };
};
