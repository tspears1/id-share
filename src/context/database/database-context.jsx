// React
import React, { useEffect, useState } from "react";

// Context ==================================
import { DatabaseContext } from "./useDatabase.js";

/**
 * @component DatabaseProvider - Provides database context.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.children - Component children.
 *
 * @returns {JSX.Element} component - Component JSX.
 */
const DatabaseProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    fetch("/data.json").then((res) => res.json()).then((data) => {
      setDatabase(data);
    });
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        sprints: database?.sprints,
        projects: database?.projects,
        taxonomy: database?.taxonomy,
        org: database?.org,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

DatabaseProvider.displayName = "DatabaseProvider";

export { DatabaseProvider };
