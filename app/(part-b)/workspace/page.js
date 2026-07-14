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

  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <HistoryPanel 
          history={history} 
          isLoading={isLoadingHistory} 
          onSelect={setCurrentAsset}
          selectedId={currentAsset?.id}
        />
        <main className="relative flex-1 flex flex-col min-w-0 bg-background">
          <div className="flex flex-1 overflow-hidden relative">
            <InteractiveCanvas 
              currentAsset={currentAsset} 
              isGenerating={isGenerating}
              onGenerateEdit={handleGenerateEdit}
              activeTool={activeTool}
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
          />
        </main>
      </div>
    </div>
  );
}
