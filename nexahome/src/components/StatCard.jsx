import * as React from "react";
import { Menu, X } from "lucide-react";

// Constants
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Context
const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

// Provider
const SidebarProvider = React.forwardRef(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [openMobile, setOpenMobile] = React.useState(false);
    const [_open, _setOpen] = React.useState(defaultOpen);

    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const state = open ? "expanded" : "collapsed";
    const contextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={`group/sidebar-wrapper flex min-h-screen w-full ${className || ""}`}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

// Sidebar Component
const Sidebar = React.forwardRef(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={`flex h-full w-64 flex-col bg-slate-900 text-white ${className || ""}`}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <div
          className={`fixed inset-0 z-40 ${
            openMobile ? "block" : "hidden"
          }`}
          onClick={() => setOpenMobile(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-72 bg-slate-900 text-white shadow-lg overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`hidden md:block ${className || ""}`}
        data-state={state}
      >
        <div
          className={`transition-all duration-200 ${
            state === "collapsed" ? "w-20" : "w-64"
          }`}
        />
        <div
          className={`fixed inset-y-0 left-0 z-10 flex h-screen transition-all duration-200 ${
            state === "collapsed" ? "w-20" : "w-64"
          }`}
        >
          <div className="flex h-full w-full flex-col bg-slate-900 text-white">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

// Sidebar Trigger Button
const SidebarTrigger = React.forwardRef(({ className = "", onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-slate-100 hover:text-slate-900 ${className}`}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <Menu size={20} />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

// Sidebar Header
const SidebarHeader = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 p-4 border-b border-slate-700 ${className}`}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

// Sidebar Content
const SidebarContent = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2 ${className}`}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

// Sidebar Footer
const SidebarFooter = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 p-4 border-t border-slate-700 ${className}`}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

// Sidebar Group
const SidebarGroup = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex w-full flex-col p-2 ${className}`}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

// Sidebar Group Label
const SidebarGroupLabel = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider ${className}`}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// Sidebar Group Content
const SidebarGroupContent = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full text-sm ${className}`}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

// Sidebar Menu
const SidebarMenu = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={`flex w-full flex-col gap-1 ${className}`}
      {...props}
    />
  );
});
SidebarMenu.displayName = "SidebarMenu";

// Sidebar Menu Item
const SidebarMenuItem = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={`relative group/menu-item ${className}`}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Menu Button
const SidebarMenuButton = React.forwardRef(
  (
    {
      isActive = false,
      className = "",
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "button";

    return (
      <Comp
        ref={ref}
        className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-cyan-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        } ${className}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar Menu Sub
const SidebarMenuSub = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={`mx-2 border-l border-slate-700 px-4 py-2 ${className}`}
      {...props}
    />
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";

// Sidebar Menu Sub Item
const SidebarMenuSubItem = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={`relative ${className}`}
      {...props}
    />
  );
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

// Sidebar Menu Sub Button
const SidebarMenuSubButton = React.forwardRef(
  (
    {
      isActive = false,
      className = "",
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "a";

    return (
      <Comp
        ref={ref}
        className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          isActive
            ? "text-cyan-400"
            : "text-slate-400 hover:text-slate-200"
        } ${className}`}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// Sidebar Separator
const SidebarSeparator = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`mx-2 my-2 h-px bg-slate-700 ${className}`}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

// Sidebar Inset
const SidebarInset = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={`relative flex min-h-screen flex-1 flex-col bg-background md:ml-64 ${className}`}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};