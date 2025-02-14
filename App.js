import { useState } from "react";
import useCalculatorStore from "./stores/useCalculatorStore";
import DraggableContainer from "./components/DraggableContainer";
import Display from "./components/Display";

export default function CalculatorApp() {
  const { addComponent, clearCalculator, calculateResult, input } =
    useCalculatorStore();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const handleClick = (label) => {
    // Always add the component first
    addComponent(label);

    // Then perform the action if it's = or C
    if (label === "=") {
      calculateResult();
    } else if (label === "C") {
      clearCalculator();
    }
  };
  return (
    // Dark mode class applied to the entire app
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Centered container */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4">
        {/* Dark Mode Toggle */}
        <div className="mb-8">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-gray-700 dark:text-gray-300">
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 ${
                  darkMode ? "transform translate-x-6 bg-gray-800" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>

        {/* Calculator Container */}
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Sidebar for buttons */}
            <div className="w-full md:w-1/4 flex flex-col gap-4 p-4 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-3 gap-3">
                {[
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  0,
                  "+",
                  "-",
                  "*",
                  "/",
                  "C",
                  "=",
                ].map((label) => (
                  <button
                    key={String(label)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-3 rounded-lg text-2xl font-bold shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    onClick={() => handleClick(label)}
                  >
                    {String(label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Calculator UI */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white flex items-center gap-3 justify-center">
                <img
                  src="/helpee.jpeg"
                  alt="Calculator Logo"
                  className="w-10 h-10 object-contain rounded-full"
                />
                Drag & Drop Calculator
              </h1>
              <Display value={input || "0"} />
              <DraggableContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
