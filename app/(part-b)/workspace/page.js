"use client";

import * as React from "react";
import { Header } from "@/components/shared/Header";
import { HistoryPanel } from "@/components/shared/HistoryPanel";
import { InteractiveCanvas } from "./components/InteractiveCanvas";
import { FloatingControls } from "./components/FloatingControls";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { useToast } from "@/components/ui/toast";

export default function WorkspacePage() {
  const { toast } = useToast();
  
  const [history, setHistory] = React.useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(true);
  const [currentAsset, setCurrentAsset] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data.data);
        if (data.data.length > 0) {
          setCurrentAsset(data.data[0]);
        }
      } catch (err) {
        toast({ title: "Failed to load history", variant: "error" });
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, [toast]);

  const [activeTool, setActiveTool] = React.useState("select");
  const [brushStrength, setBrushStrength] = React.useState(85);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

  const handleGenerateEdit = async (prompt, box) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: currentAsset.model, aspectRatio: currentAsset.aspectRatio })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Edit failed");

      setCurrentAsset(data.data);
      setHistory(prev => [data.data, ...prev]);

      toast({ title: "Edit successful", variant: "success" });
    } catch (err) {
      toast({ title: "Edit failed", description: err.message, variant: "error" });
    } finally {
      setIsGenerating(false);
    }
  };

  const canvasRef = React.useRef(null);

  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile History Toggle Button */}
        <div className="absolute left-4 top-4 z-40 lg:hidden">
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-surface-default shadow-md border border-border-default focus:outline-none"
            onClick={() => setIsHistoryOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
          </button>
        </div>

        {/* Mobile Backdrop */}
        {isHistoryOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsHistoryOpen(false)}
          />
        )}

        <div className={`
          fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 lg:static lg:flex lg:h-full lg:translate-x-0
          ${isHistoryOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <HistoryPanel 
            history={history} 
            isLoading={isLoadingHistory} 
            onSelect={(asset) => {
              setCurrentAsset(asset);
              setIsHistoryOpen(false); // Close on selection on mobile
            }}
            selectedId={currentAsset?.id}
          />
        </div>

        <main className="relative flex-1 flex flex-col min-w-0 bg-background">
          <div className="flex flex-1 overflow-hidden relative">
            <InteractiveCanvas 
              ref={canvasRef}
              currentAsset={currentAsset} 
              isGenerating={isGenerating}
              onGenerateEdit={handleGenerateEdit}
              activeTool={activeTool}
              brushStrength={brushStrength}
            />
            <PropertiesPanel 
              activeTool={activeTool}
              brushStrength={brushStrength}
              setBrushStrength={setBrushStrength}
            />
          </div>
          <FloatingControls 
            activeTool={activeTool} 
            setActiveTool={setActiveTool} 
            onUndo={() => canvasRef.current?.undo()}
          />
        </main>
      </div>
    </div>
  );
}
