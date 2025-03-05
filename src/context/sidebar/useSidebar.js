import React, { createContext, useContext } from "react";

// Create Context ==========================================
const SidebarContext = createContext(null);

/**
 * Hook to access sidebar context.
 *
 * @returns {Object} Context object.
 */
const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};

export { useSidebar, SidebarContext}