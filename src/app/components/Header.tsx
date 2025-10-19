// app/components/Header.tsx
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <Link href="/">
        <h1 className="text-xl font-bold hover:text-blue-600 transition-colors">
          TheSungwon’s Blog
        </h1>
      </Link>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-400"
        aria-label="Toggle theme"
      >
        모드 변경 :{theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
