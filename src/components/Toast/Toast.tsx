import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Toast.module.css';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast notification component for feedback messages
 * Auto-dismisses after duration, supports optional action
 */
export const Toast = memo(function Toast({
  message,
  onDismiss,
  duration = 3000,
  action,
}: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          role="alert"
          aria-live="polite"
        >
          <div className={styles.toast}>
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className={styles.message}>{message}</span>
            {action && (
              <button className={styles.action} onClick={action.onClick}>
                {action.label}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

