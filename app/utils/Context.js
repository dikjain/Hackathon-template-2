"use client";

import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext({
    theme: "light",
    setTheme: () => null,
});

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
