import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { TodoList as TodoListType } from '../types/todo';

interface TodoListProps {
  todos: TodoListType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
  onCancelEdit: () => void;
  onError: (message: string) => void;
  editingTodoId: number | null;
  isLoading: boolean;
  error: string | null;
  showCompleted: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete,
  onEdit,
  onUpdate,
  onCancelEdit,
  onError,
  editingTodoId,
  isLoading, 
  error,
  showCompleted
}) => {
  const filteredTodos = showCompleted 
    ? todos 
    : todos.filter(todo => !todo.checked);

  if (isLoading) {
    return (
      <motion.div 
        className="text-center py-8 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-tertiary/30 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-tertiary/20 rounded w-3/4"></div>
        </div>
        <p className="mt-4">Loading todos...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="error-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="font-medium text-primary">Error</p>
        <p>{error}</p>
      </motion.div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <motion.div 
        className="text-center py-8 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {todos.length === 0 ? 
          "No todos yet. Add one to get started!" : 
          "No uncompleted todos. Toggle to show completed items or add a new todo."}
      </motion.div>
    );
  }

  return (
    <div className="mt-6 pb-24" data-testid="todo-list">
      <AnimatePresence initial={false}>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onCancelEdit={onCancelEdit}
            onError={onError}
            isEditing={editingTodoId === todo.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
