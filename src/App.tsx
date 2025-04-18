import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { SuccessToast } from './components/SuccessToast';
import { ErrorToast } from './components/ErrorToast';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

function App() {
  const [initialTodos, setInitialTodos] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://everest-interview-public-files.s3.amazonaws.com/input.json');
        const data = await response.json();
        
        setTimeout(() => {
          setInitialTodos(data.todos);
        }, 500);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const { 
    todos, 
    isLoading, 
    error, 
    editingTodoId,
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
  } = useTodos(initialTodos);

  const showSuccess = (message: string) => {
    setShowErrorMessage(false);
    
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const showError = (message: string) => {
    setShowSuccessMessage(false);
    
    setErrorMessage(message);
    setShowErrorMessage(true);
    setTimeout(() => setShowErrorMessage(false), 3000);
  };

  const handleAddTodo = (content: string) => {
    addTodo(content);
    showSuccess('Todo added successfully!');
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
    const todo = todos.find(t => t.id === id);
    showSuccess(`Status set to ${!todo?.checked ? 'complete' : 'incomplete'}!`);
  };

  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
    showSuccess('Item removed successfully!');
  };

  const handleUpdateTodo = (id: number, content: string) => {
    updateTodoContent(id, content);
    showSuccess('Item updated successfully!');
  };

  const handleUndo = () => {
    undo();
    showSuccess('Action undone!');
  };

  const handleRedo = () => {
    redo();
    showSuccess('Action redone!');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (!e.shiftKey && canUndo) {
          e.preventDefault();
          handleUndo();
        } else if (e.shiftKey && canRedo) {
          e.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo]);

  const completedCount = todos.filter(todo => todo.checked).length;
  
  return (
    <motion.div 
      className="everest-app"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header 
        title="TODO App" 
        theme={theme}
        toggleTheme={toggleTheme}
        showCompleted={showCompleted}
        toggleShowCompleted={() => setShowCompleted(!showCompleted)}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      
      <motion.main
        className="everest-app__main"
        variants={itemVariants}
      >
        <div className="everest-app__content">
          <TodoForm onAddTodo={handleAddTodo} onError={showError} />
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 mt-8">
            <h2 className="text-xl font-semibold text-secondary dark:text-tertiary">Your Todos</h2>
          </div>
          
          <div className="relative">
            <TodoList 
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleRemoveTodo}
              onEdit={startEditingTodo}
              onUpdate={handleUpdateTodo}
              onCancelEdit={cancelEditingTodo}
              onError={showError}
              editingTodoId={editingTodoId}
              isLoading={isLoading}
              error={error}
              showCompleted={showCompleted}
            />
          </div>
        </div>
      </motion.main>
      
      <Footer 
        totalCount={todos.length} 
        completedCount={completedCount} 
        showingCompleted={showCompleted}
      />
      <AnimatePresence>
        {showSuccessMessage && <SuccessToast message={successMessage} />}
      </AnimatePresence>
      <AnimatePresence>
        {showErrorMessage && <ErrorToast errorMessage={errorMessage} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
