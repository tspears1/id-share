// React ==================================================
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import cn from "classnames";

// Components ==============================================
import { TooltipProvider } from "@components/ui/Tooltip/Tooltip.jsx";

// Hooks ==================================================
import useIsMobile from "@hooks/use-mobile.jsx";

// Constants ==============================================
import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_INLINE_SIZE,
  SIDEBAR_INLINE_SIZE_ICON,
} from "@constants/sidebar-contants.js";

// Context ==================================================
import { SidebarContext } from "./useSidebar.js";

/**
 * @component SidebarProvider - Provides sidebar context.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.children - Component children.
 *
 * @returns {JSX.Element} component - Component JSX.
 */
const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className = "",
  style,
  children,
  ref,
  ...props
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie =
      `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [setOpenProp, open]);

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo(() => {
    return {
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    };
  }, [
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  ]);

  return (
    <>
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={{
              "--sidebar-inline-size": SIDEBAR_INLINE_SIZE,
              "--sidebar-inline-size-icon": SIDEBAR_INLINE_SIZE_ICON,
              ...style,
            }}
            className={cn(
              "sidebar__wrapper",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    </>
  );
};

SidebarProvider.displayName = "SidebarProvider";

export { SidebarProvider };
