import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AlertTriangle, HelpCircle } from "lucide-react";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);
  const resolver = useRef(null);

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      resolver.current = resolve;
      setState({
        title: options.title || "আপনি কি নিশ্চিত?",
        message: options.message || "",
        confirmLabel: options.confirmLabel || "নিশ্চিত করুন",
        cancelLabel: options.cancelLabel || "বাতিল",
        danger: options.danger !== false,
      });
    });
  }, []);

  const settle = (result) => {
    setState(null);
    resolver.current?.(result);
    resolver.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
          onClick={() => settle(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
                  state.danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                }`}
              >
                {state.danger ? <AlertTriangle size={20} /> : <HelpCircle size={20} />}
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{state.title}</h3>
                {state.message && <p className="mt-1 text-sm leading-6 text-slate-600">{state.message}</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => settle(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                {state.cancelLabel}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => settle(true)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
                  state.danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {state.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}
