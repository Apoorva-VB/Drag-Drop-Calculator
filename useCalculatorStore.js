import { create } from "zustand";

const STORAGE_KEY = "calculator_state";

const loadState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  return savedState
    ? JSON.parse(savedState)
    : { components: [], history: [], future: [] };
};

const useCalculatorStore = create((set) => ({
  ...loadState(),
  input: "", // Ensure input is not persisted to avoid interference

  saveState: (state) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        components: state.components,
        history: state.history,
        future: state.future,
      })
    );
  },

  addComponent: (label) =>
    set((state) => {
      const newComponents = [
        ...state.components,
        {
          id: Date.now().toString(),
          label: String(label),
          type: typeof label === "number" ? "number" : "operation",
        },
      ];
      const newState = {
        components: newComponents,
        history: [...state.history, state.components],
        future: [],
      };
      state.saveState(newState);
      return newState;
    }),

  appendInput: (value) =>
    set((state) => ({
      input: state.input + String(value),
    })),

  removeComponent: (id, saveHistory = false) =>
    set((state) => {
      const newComponents = state.components.filter((comp) => comp.id !== id);
      const newState = {
        components: newComponents,
        history: saveHistory
          ? [...state.history, state.components]
          : state.history,
        future: [],
      };
      state.saveState(newState);
      return newState;
    }),

  updateLayout: (newLayout, saveHistory = false) =>
    set((state) => {
      const newState = {
        components: newLayout,
        history: saveHistory
          ? [...state.history, state.components]
          : state.history,
        future: [],
      };
      state.saveState(newState);
      return newState;
    }),

  clearCalculator: () =>
    set((state) => {
      const newState = {
        components: [],
        input: "",
        history: [...state.history, state.components],
        future: [],
      };
      state.saveState(newState);
      return newState;
    }),

  calculateResult: () =>
    set((state) => {
      try {
        const evaluatedResult = new Function(`return ${state.input}`)();
        return {
          input: String(evaluatedResult),
        };
      } catch (error) {
        return { input: "Error" };
      }
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;
      const prevState = state.history[state.history.length - 1];
      const newState = {
        components: prevState,
        history: state.history.slice(0, -1),
        future: [state.components, ...state.future],
      };
      state.saveState(newState);
      return newState;
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const nextState = state.future[0];
      const newState = {
        components: nextState,
        history: [...state.history, state.components],
        future: state.future.slice(1),
      };
      state.saveState(newState);
      return newState;
    }),
}));

export default useCalculatorStore;
