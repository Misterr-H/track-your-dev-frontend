import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface PlanSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanSprintModal({ isOpen, onClose }: PlanSprintModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-40 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full bg-black/30 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
              <span className="text-sm text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded border border-neutral-700">
                Esc
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-800/50 transition-colors cursor-pointer active:scale-95 transform duration-100 flex items-center justify-center group"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Content will go here */}
            <div className="absolute inset-0 flex-col flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-white">Plan a Sprint</h2>
              <h2 className='text-neutral-400'>This section is under development</h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 