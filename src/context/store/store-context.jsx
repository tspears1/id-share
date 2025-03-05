import React, { useEffect, useState } from "react";

// Context ==================================
import { StoreContext } from "./useStore.js";

/**
 * @component StoreProvider - Provides store context.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.children - Component children.
 *
 * @returns {JSX.Element} component - Component JSX.
 */
const StoreProvider = ({ children }) => {
   const [activeProject, setActiveProject] = useState(null);
   const [activePhase, setActivePhase] = useState(null);
   const [activeLayout, setActiveLayout] = useState('grid');

   // useEffect(() => {
   //    console.log('activePhase', activePhase)
   //    console.log('activeLayout', activeLayout)
   //    console.log('activeProject', activeProject)
   // }, [activePhase, activeLayout, activeProject])

   return (
      <StoreContext.Provider
         value={{
            activeProject,
            setActiveProject,
            activePhase,
            setActivePhase,
            activeLayout,
            setActiveLayout,
         }}
      >
         {children}
      </StoreContext.Provider>
   );
};

StoreProvider.displayName = "StoreProvider";

export { StoreProvider }