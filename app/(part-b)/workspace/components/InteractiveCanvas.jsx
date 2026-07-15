import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Wand2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const InteractiveCanvas = React.forwardRef(function InteractiveCanvas({ currentAsset, isGenerating, onGenerateEdit, activeTool, brushStrength }, ref) {
  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  
  // Vector stroke state
  const [strokes, setStrokes] = React.useState([]);
  const currentStrokeRef = React.useRef(null);
  const debounceRef = React.useRef(null);
  
  // Dimensions and cursor tracking
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [cursorPos, setCursorPos] = React.useState(null);

  React.useImperativeHandle(ref, () => ({
    undo: () => {
      setStrokes(prev => {
        const newStrokes = prev.slice(0, -1);
        if (newStrokes.length === 0) setShowPrompt(false);
        return newStrokes;
      });
    }
  }));

  // Sync canvas size to image size losslessly
  React.useEffect(() => {
    if (!imageRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [currentAsset]);

  // Redraw all vector strokes
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;
    const ctx = canvas.getContext('2d');
    
    // Set actual canvas resolution
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    strokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = stroke.size;
      
      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = "black";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5;
        // Using accent-default (coral/orange)
        ctx.strokeStyle = `hsl(15, 80%, 57%)`; 
      }
      
      const startX = stroke.points[0].x * canvas.width;
      const startY = stroke.points[0].y * canvas.height;
      ctx.moveTo(startX, startY);
      
      for (let i = 1; i < stroke.points.length; i++) {
        const px = stroke.points[i].x * canvas.width;
        const py = stroke.points[i].y * canvas.height;
        ctx.lineTo(px, py);
      }
      ctx.stroke();
    });
  }, [strokes, dimensions]);

  const handlePointerDown = (e) => {
    if (!currentAsset || isGenerating || (activeTool !== 'brush' && activeTool !== 'eraser')) return;
    e.target.setPointerCapture(e.pointerId);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setShowPrompt(false);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / dimensions.width;
    const y = (e.clientY - rect.top) / dimensions.height;
    
    setIsDrawing(true);
    currentStrokeRef.current = {
      tool: activeTool,
      size: brushStrength,
      points: [{ x, y }]
    };
    
    // Draw initial dot to context immediately
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushStrength;
    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = "black";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = `hsl(15, 80%, 57%)`; 
    }
    ctx.moveTo(x * dimensions.width, y * dimensions.height);
    ctx.lineTo(x * dimensions.width, y * dimensions.height);
    ctx.stroke();
  };

  const handlePointerMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    if (!isDrawing || !currentStrokeRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / dimensions.width;
    const y = (e.clientY - rect.top) / dimensions.height;
    
    currentStrokeRef.current.points.push({ x, y });
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x * dimensions.width, y * dimensions.height);
    ctx.stroke();
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    e.target.releasePointerCapture(e.pointerId);
    setIsDrawing(false);
    
    const finishedStroke = currentStrokeRef.current;
    if (finishedStroke && finishedStroke.points.length > 0) {
      setStrokes(prev => [...prev, finishedStroke]);
    }
    currentStrokeRef.current = null;
    
    debounceRef.current = setTimeout(() => {
      setStrokes(currentStrokes => {
        if (currentStrokes.length > 0) setShowPrompt(true);
        return currentStrokes;
      });
    }, 500);
  };

  const cancelSelection = () => {
    setShowPrompt(false);
    setStrokes([]);
    setPrompt("");
  };

  const getBoundingBox = () => {
    if (strokes.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    strokes.forEach(stroke => {
      stroke.points.forEach(p => {
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
      });
    });
    return {
      left: minX * dimensions.width,
      top: minY * dimensions.height,
      width: (maxX - minX) * dimensions.width,
      height: (maxY - minY) * dimensions.height
    };
  };

  const renderBox = getBoundingBox();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setShowPrompt(false);
    onGenerateEdit(prompt, renderBox);
    setPrompt("");
    setStrokes([]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showPrompt) cancelSelection();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPrompt]);

  if (!currentAsset) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-text-muted flex flex-col items-center gap-4">
          <Wand2 className="h-12 w-12 opacity-20" />
          <p className="font-medium">Select an image from history to start editing</p>
        </div>
      </div>
    );
  }

  // Determine if custom cursor should be shown
  const showCustomCursor = (activeTool === 'brush' || activeTool === 'eraser') && cursorPos && !showPrompt && !isGenerating;

  return (
    <div 
      className="relative flex-1 flex items-center justify-center bg-background overflow-hidden p-8"
      onPointerLeave={() => setCursorPos(null)}
    >
      <div 
        ref={containerRef}
        className={`relative inline-flex max-w-full max-h-[85vh] rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] touch-none select-none ${showCustomCursor ? 'cursor-none' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image 
          ref={imageRef}
          src={currentAsset.url} 
          alt={currentAsset.prompt} 
          width={1024}
          height={1024}
          className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md pointer-events-none"
          draggable={false}
          priority
        />

        {/* Drawing Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ width: dimensions.width, height: dimensions.height }}
        />

        {/* Custom Cursor */}
        {showCustomCursor && (
          <motion.div
            className="absolute pointer-events-none z-30 rounded-full"
            style={{
              width: brushStrength,
              height: brushStrength,
              left: cursorPos.x - brushStrength / 2,
              top: cursorPos.y - brushStrength / 2,
              backgroundColor: activeTool === 'brush' ? 'rgba(232, 104, 61, 0.2)' : 'transparent',
              border: activeTool === 'brush' ? '1px solid rgba(232, 104, 61, 0.8)' : '1px dashed rgba(255, 255, 255, 0.8)',
              backdropFilter: activeTool === 'eraser' ? 'invert(10%)' : 'none'
            }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
          />
        )}

        {/* Contextual Prompt Popover */}
        <AnimatePresence>
          {showPrompt && renderBox && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-40 pointer-events-auto"
              style={{
                left: renderBox.left + renderBox.width / 2,
                top: renderBox.top + renderBox.height,
              }}
            >
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 flex w-[320px] items-center gap-2 rounded-xl border border-border-default bg-surface-default p-2 shadow-2xl"
                onClick={e => e.stopPropagation()}
                onPointerDown={e => e.stopPropagation()}
              >
                <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
                  <input
                    autoFocus
                    type="text"
                    placeholder="What do you want here?"
                    className="w-full bg-transparent text-sm font-medium text-text-primary placeholder:text-text-muted focus:outline-none px-2"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                  />
                  <div className="flex items-center gap-1">
                    <Button type="button" variant="ghost" className="h-8 w-8 p-0 shrink-0 rounded-lg text-text-muted hover:text-text-primary flex items-center justify-center" onClick={cancelSelection}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button type="submit" variant="primary" className="h-8 w-8 p-0 shrink-0 !rounded-lg flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-md bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-default p-6 shadow-2xl border border-border-subtle">
              <Loader2 className="h-8 w-8 animate-spin text-accent-default" />
              <p className="text-sm font-medium text-text-primary animate-pulse">Applying edits...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
