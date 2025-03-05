// React ====================================
import React from "react";

// Context ============================================
import { DatabaseProvider } from "@context/database/database-context.jsx";
import { SidebarProvider } from "@context/sidebar/sidebar-context.jsx";
import { StoreProvider } from "@context/store/store-context.jsx";

/**
 * @component ContextProviders - Provides context providers.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.children - Component children.
 *
 * @returns {JSX.Element} component - Component JSX.
 */
const ContextProviders = ({ children }) => {
  return (
    <DatabaseProvider>
      <SidebarProvider>
        <StoreProvider>
          {children}
        </StoreProvider>
      </SidebarProvider>
    </DatabaseProvider>
  );
};

ContextProviders.displayName = "ContextProviders";

export { ContextProviders };
