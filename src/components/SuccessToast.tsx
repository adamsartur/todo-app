import { motion } from 'framer-motion';

export function SuccessToast({ message }: { message: string }) {
  return (
    <motion.div 
      className="success-toast"
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {message}
    </motion.div>
  );
}