import { motion } from 'framer-motion';

export function ErrorToast({ errorMessage }: { errorMessage: string }) {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {errorMessage}
    </motion.div>
  );
}