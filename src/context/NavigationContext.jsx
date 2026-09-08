import React, { createContext, useContext, useState, useCallback } from "react";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith("/salon/dashboard")) return "dashboard";
    if (path.startsWith("/salon/onboarding")) return "onboarding";
    return "landing";
  });

  const navigate = useCallback((page) => {
    setCurrentPage(page);
    const pathMap = {
      landing: "/",
      dashboard: "/salon/dashboard",
      onboarding: "/salon/onboarding",
    };
    window.history.pushState({}, "", pathMap[page] || "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used within NavigationProvider");
  return ctx;
};
