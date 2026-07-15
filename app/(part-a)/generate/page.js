"use client";

import * as React from "react";
import { Header } from "@/components/shared/Header";
import { HistoryStrip } from "./components/HistoryStrip";
import { PromptLogArea } from "./components/PromptLogArea";
import { ControlPanel } from "./components/ControlPanel";
import { useToast } from "@/components/ui/toast";

export default function GeneratePage() {
  const { toast } = useToast();
  
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("fomi-v2-hq");
  const [aspectRatio, setAspectRatio] = React.useState("1:1");
  const [imageCount, setImageCount] = React.useState("4");
  const [style, setStyle] = React.useState("");
  
  const [status, setStatus] = React.useState("idle");
  const [errorMsg, setErrorMsg] = React.useState(null);

  const [sessionLogs, setSessionLogs] = React.useState([]);
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
        body: JSON.stringify({ prompt, model, aspectRatio, style, imageCount })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      
      const newEntry = data.data;
      setSessionLogs(prev => [...prev, newEntry]); // Append to bottom
      
      // Optimistically add to history
      setHistory(prev => [newEntry, ...prev]);
      setStatus("success");
      setPrompt("");
      toast({ title: "Generation complete", description: "Your masterpiece is ready.", variant: "success" });
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
      toast({ title: "Error", description: err.message, variant: "error" });
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden relative z-0">
      <Header />
      <HistoryStrip history={history} isLoading={isLoadingHistory} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <PromptLogArea 
          sessionLogs={sessionLogs}
          isGenerating={status === "loading"}
          currentPrompt={prompt}
          aspectRatio={aspectRatio}
          imageCount={imageCount}
          error={errorMsg}
          onRetry={handleGenerate}
          onTryPrompt={setPrompt}
        />
      </div>

      <ControlPanel 
        prompt={prompt} 
        setPrompt={setPrompt}
        model={model}
        setModel={setModel}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        imageCount={imageCount}
        setImageCount={setImageCount}
        style={style}
        setStyle={setStyle}
        onGenerate={handleGenerate}
        isGenerating={status === "loading"}
      />
    </div>
  );
}
