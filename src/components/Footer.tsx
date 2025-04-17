import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  totalCount: number;
  completedCount: number;
  showingCompleted: boolean;
}

const Footer: React.FC<FooterProps> = ({ totalCount, completedCount, showingCompleted }) => {
  return (
    <motion.footer
      className="everest-app__footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p>
        Total: {totalCount} items | Completed: {completedCount} | 
        {showingCompleted ? ' Showing all' : ' Hiding completed'}
      </p>
    </motion.footer>
  );
};

export default Footer;
