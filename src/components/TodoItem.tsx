import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TodoEntry } from '../types/todo';

interface TodoItemProps {
  todo: TodoEntry;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
  onCancelEdit: () => void;
  onError: (message: string) => void;
  isEditing: boolean;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 25 
    }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: { 
      duration: 0.3,
      ease: "easeInOut" 
    }
  }
};

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit,
  onUpdate,
  onCancelEdit,
  onError,
  isEditing 
}) => {
  const [editContent, setEditContent] = React.useState(todo.content);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) {
      onError('Todo content cannot be empty');
      return;
    }
    onUpdate(todo.id, editContent);
  };

  const handleCancel = () => {
    setEditContent(todo.content);
    onCancelEdit();
  };

  const handleTextClick = () => {
    if (!isEditing) {
      onToggle(todo.id);
    }
  };

  return (
    <motion.div 
      className={`flex justify-between items-center p-4 rounded-lg shadow-sm mb-2 ${todo.checked ? 'bg-gray-50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-700'} border border-gray-100 dark:border-gray-600`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout="position"
      data-testid={`todo-item-${todo.id}`}
    >
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex-1 flex gap-2">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="flex-1 p-2 border border-tertiary rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
            autoFocus
          />
          <div className="flex gap-2">
            <motion.button 
              type="submit"
              className="btn btn-primary min-w-[60px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
            <motion.button 
              type="button"
              onClick={handleCancel}
              className="btn btn-gray min-w-[60px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => onToggle(todo.id)}
              className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-primary cursor-pointer"
              aria-label={`Mark "${todo.content}" as ${todo.checked ? 'incomplete' : 'complete'}`}
            />
            <span 
              className={`${todo.checked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'} cursor-pointer hover:text-secondary dark:hover:text-secondary transition-colors`}
              onClick={handleTextClick}
            >
              {todo.content}
            </span>
          </div>
          <div className="flex gap-2">
            <motion.button 
              onClick={() => onEdit(todo.id)}
              className="btn btn-tertiary min-w-[60px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Edit "${todo.content}"`}
            >
              Edit
            </motion.button>
            <motion.button 
              onClick={() => onDelete(todo.id)}
              className="btn btn-primary min-w-[60px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Delete "${todo.content}"`}
            >
              Delete
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TodoItem;
