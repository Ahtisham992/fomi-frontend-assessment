"use client";

import * as React from "react";
import { Header } from "@/components/shared/Header";
import { HistoryPanel } from "@/components/shared/HistoryPanel";
import { CanvasArea } from "./components/CanvasArea";
import { ControlPanel } from "./components/ControlPanel";
import { useToast } from "@/components/ui/toast";
import { AnimatePresence, motion } from "framer-motion";

export default function GeneratePage() {
  const { toast } = useToast();
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("fomi-v2-hq");
  const [aspectRatio, setAspectRatio] = React.useState("1:1");
  
  const [status, setStatus] = React.useState("idle");
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const [history, setHistory] = React.useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/history")
      .then(res => res.json())
      .then(data => { setHistory(data.data); setIsLoadingHistory(false); })
      .catch(() => setIsLoadingHistory(false));
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model, aspectRatio })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      
      setResult(data.data);
      // Optimistically add to history
      setHistory(prev => [data.data, ...prev]);
      setStatus("success");
      toast({ title: "Generation complete", description: "Your masterpiece is ready.", variant: "success" });
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
      toast({ title: "Error", description: err.message, variant: "error" });
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <CanvasArea 
          status={status} 
          result={result} 
          error={errorMsg} 
          onRetry={handleGenerate} 
          onTryPrompt={setPrompt}
          aspectRatio={aspectRatio}
        />
        <div className="absolute right-0 top-0 bottom-0 z-40 flex pointer-events-none">
          <div className="relative flex items-center pointer-events-auto">
            <button 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="absolute right-full mr-0 bg-surface-default/90 backdrop-blur-md border border-r-0 border-border-default rounded-l-xl p-2.5 shadow-xl flex items-center justify-center hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default"
            >
              {isHistoryOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary"><path d="m9 18 6-6-6-6"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
              )}
              {!isHistoryOpen && history.length > 0 && (
                <span className="absolute -top-1.5 -left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-default text-[9px] font-bold text-white shadow-sm">
                  {history.length}
                </span>
              )}
            </button>
          </div>
          <AnimatePresence initial={false}>
            {isHistoryOpen && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 256 }}
                exit={{ width: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full bg-surface-default/90 backdrop-blur-xl border-l border-border-default shadow-2xl pointer-events-auto overflow-hidden shrink-0"
              >
                <div className="w-64 h-full">
                  <HistoryPanel history={history} isLoading={isLoadingHistory} onSelect={() => {}} selectedId={result?.id} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ControlPanel 
        prompt={prompt} 
        setPrompt={setPrompt}
        model={model}
        setModel={setModel}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        onGenerate={handleGenerate}
        isGenerating={status === "loading"}
      />
    </div>
  );
}
