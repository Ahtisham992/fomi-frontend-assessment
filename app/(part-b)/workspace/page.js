"use client";

import * as React from "react";
import { HistoryPanel } from "./components/HistoryPanel";
import { InteractiveCanvas } from "./components/InteractiveCanvas";
import { FloatingControls } from "./components/FloatingControls";
import { useToast } from "@/components/ui/toast";

export default function WorkspacePage() {
  const { toast } = useToast();
  
  const [history, setHistory] = React.useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(true);
  const [currentAsset, setCurrentAsset] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  // Load returning user history
  React.useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data.data);
        if (data.data.length > 0) {
          setCurrentAsset(data.data[0]); // Load most recent
        }
      } catch (err) {
        toast({ title: "Failed to load history", variant: "error" });
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, [toast]);

  const handleGenerateEdit = async (prompt, box) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          model: currentAsset.model, 
          aspectRatio: currentAsset.aspectRatio 
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Edit failed");

      // Set new asset as current and add to history
      setCurrentAsset(data.data);
      setHistory(prev => [data.data, ...prev]);

      toast({
        title: "Edit successful",
        description: "Your changes have been applied.",
        variant: "success"
      });
    } catch (err) {
      toast({
        title: "Edit failed",
        description: err.message,
        variant: "error"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <HistoryPanel 
        history={history} 
        isLoading={isLoadingHistory} 
        onSelect={setCurrentAsset}
        selectedId={currentAsset?.id}
      />
      <main className="relative flex-1 flex flex-col min-w-0 bg-background">
        <InteractiveCanvas 
          currentAsset={currentAsset} 
          isGenerating={isGenerating}
          onGenerateEdit={handleGenerateEdit}
        />
        <FloatingControls />
      </main>
    </div>
  );
}
