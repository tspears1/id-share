import React, { createContext, useContext } from "react";

// Create Context ==========================================
const StoreContext = createContext(null);

/**
 * Hook to access store context.
 *
 * @returns {Object} Context object.
 */
const useStore = () => {
   const context = useContext(StoreContext);
   if (!context) {
      throw new Error("useStore must be used within a StoreProvider.");
   }
   return context;
};

export { useStore, StoreContext}