import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

interface TodoFormProps {
  onAddTodo: (content: string) => void;
  onError: (message: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, onError }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      onError('Todo content cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 300));
    
      onAddTodo(content);
      
      setContent('');
    } catch (err) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError('Failed to add todo');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="sticky top-0 bg-white dark:bg-gray-800 pt-4 pb-6 z-10 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <motion.form 
        className="mb-0"
        onSubmit={handleSubmit}
        data-testid="todo-form"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-row items-end gap-3">
          <div className="flex-1">
            <label htmlFor="todo-content" className="block text-sm font-medium text-secondary dark:text-tertiary mb-1">
              New Todo
            </label>
            <input
              id="todo-content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all border-tertiary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              data-testid="todo-input"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex-shrink-0">
            <motion.button 
              type="submit" 
              className={`btn ${
                !content.trim() || isSubmitting ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'btn-secondary'
              } mb-1 relative overflow-hidden w-10 h-10 rounded-full flex items-center justify-center`}
              disabled={!content.trim() || isSubmitting}
              data-testid="add-todo-btn"
              whileHover={{ scale: content.trim() && !isSubmitting ? 1.05 : 1 }}
              whileTap={{ scale: content.trim() && !isSubmitting ? 0.95 : 1 }}
              title="Add Todo"
              aria-label="Add Todo"
            >
              {isSubmitting ? (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </motion.div>
              ) : (
                <FiPlus className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default TodoForm;
