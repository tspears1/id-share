import React, { createContext, useContext } from "react";

// Create context.
const DatabaseContext = createContext(null);

/**
 * Hook to provide database context.
 *
 * @returns {Object} database - Database context.
 */
const useDatabase = () => {
   const context = useContext(DatabaseContext);
   if (!context) {
      throw new Error("useDatabase must be used within a DatabaseProvider.");
   }
   return context;
};

export { useDatabase, DatabaseContext };