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
        />
        <AnimatePresence>
          {(status === "success" || status === "loading") && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-border-default overflow-hidden hidden xl:block shrink-0"
            >
              <div className="w-64 h-full">
                <HistoryPanel history={history} isLoading={isLoadingHistory} onSelect={() => {}} selectedId={result?.id} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
