import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

function ThemeToggle() {
  const themes = ["system", "light", "dark"];
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  };

  const onClick = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  // Cycle between light/dark/system
  const cycleTheme = () => {
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    onClick(themes[nextIndex]);
  };

  return (
    <>
      {/* Large screen toggle (existing UI) */}
      <div className="hidden md:flex items-center bg-[var(--theme-button-color)] rounded-full p-[2px] w-28 justify-between relative theme-toggle">
        <div
          className="absolute top-[2px] left-0 w-1/3 h-[calc(100%-4px)] bg-[var(--current-theme)] rounded-full transition-all duration-300"
          style={{ left: `${themes.indexOf(theme) * 33.33}%` }}
        ></div>

        {themes.map((t) => (
          <button
            key={t}
            onClick={() => onClick(t)}
            className="flex-1 flex items-center justify-center relative z-10 text-gray-700 dark:text-gray-200 p-1"
          >
            {t === "light" && <Sun className="w-4 h-4" />}
            {t === "dark" && <Moon className="w-4 h-4" />}
            {t === "system" && <Monitor className="w-4 h-4" />}
          </button>
        ))}
      </div>

      {/* Small/Medium screen single button */}
      <button
        onClick={cycleTheme}
        className="theme-toggle md:hidden flex items-center justify-center bg-[var(--theme-button-color)] text-gray-700 dark:text-gray-200 rounded-full p-2 transition-all duration-300"
      >
        {theme === "dark" && <Moon className="w-5 h-5" />}
        {theme === "light" && <Sun className="w-5 h-5" />}
        {theme === "system" && <Monitor className="w-5 h-5" />}
      </button>
    </>
  );
}

export default ThemeToggle;
