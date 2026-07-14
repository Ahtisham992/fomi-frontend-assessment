"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

const ToastContext = React.createContext({
  toast: () => {},
});

export const useToast = () => React.useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description, variant = "info", duration = 5000 }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 pt-20 sm:top-0 sm:right-0 sm:bottom-auto md:max-w-[420px]">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-state-success" />,
    error: <AlertCircle className="h-5 w-5 text-state-error" />,
    info: <Info className="h-5 w-5 text-state-info" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-border-default bg-surface-default p-4 pr-8 shadow-lg transition-all mb-2"
    >
      <div className="flex gap-3 items-start">
        <div className="mt-0.5">{icons[toast.variant] || icons.info}</div>
        <div className="flex flex-col gap-1">
          {toast.title && <div className="text-sm font-semibold text-text-primary">{toast.title}</div>}
          {toast.description && <div className="text-sm opacity-90 text-text-muted">{toast.description}</div>}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="absolute right-2 top-2 rounded-md p-1 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
