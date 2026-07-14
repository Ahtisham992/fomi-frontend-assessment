"use client";

import * as React from "react";
import { Header } from "./components/Header";
import { CanvasArea } from "./components/CanvasArea";
import { ControlPanel } from "./components/ControlPanel";
import { useToast } from "@/components/ui/toast";

export default function GeneratePage() {
  const { toast } = useToast();
  
  // States
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState("fomi-v2-hq");
  const [aspectRatio, setAspectRatio] = React.useState("1:1");
  
  const [status, setStatus] = React.useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [result, setResult] = React.useState(null);

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

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.data);
      setStatus("success");
      toast({
        title: "Generation complete",
        description: "Your masterpiece is ready.",
        variant: "success"
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setStatus("error");
      toast({
        title: "Error",
        description: err.message,
        variant: "error"
      });
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <CanvasArea 
        status={status} 
        result={result} 
        error={errorMsg} 
        onRetry={handleGenerate} 
      />
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
