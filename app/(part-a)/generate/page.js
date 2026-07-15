"use client";

import * as React from "react";
import { Header } from "@/components/shared/Header";
import { HistoryStrip } from "./components/HistoryStrip";
import { PromptLogArea } from "./components/PromptLogArea";
import { ControlPanel } from "./components/ControlPanel";
import { useToast } from "@/components/ui/toast";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

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
  const [previewImage, setPreviewImage] = React.useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/history")
      .then(res => res.json())
      .then(data => { setHistory(data.data); setIsLoadingHistory(false); })
      .catch(() => setIsLoadingHistory(false));
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    if (previewImage) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

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
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 z-50">
          <HistoryStrip 
            history={history} 
            isLoading={isLoadingHistory} 
            onPreview={setPreviewImage} 
            isOpen={isHistoryOpen}
            onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
          />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden relative">
          <PromptLogArea 
            sessionLogs={sessionLogs}
          isGenerating={status === "loading"}
          currentPrompt={prompt}
          aspectRatio={aspectRatio}
          imageCount={imageCount}
          error={errorMsg}
          onRetry={handleGenerate}
          onTryPrompt={setPrompt}
          onPreviewImage={setPreviewImage}
        />
        </div>
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

      {/* Full Screen Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
            onClick={() => setPreviewImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-w-7xl">
              <Image 
                src={previewImage} 
                alt="Preview" 
                fill 
                className="object-contain" 
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
