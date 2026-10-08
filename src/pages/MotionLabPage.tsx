import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';

export function MotionLabPage() {
  const { setSidebarContent } = useSidebar();
  const [type, setType] = useState<"spring" | "tween">("spring");
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(25);
  const [mass, setMass] = useState(1);
  const [duration, setDuration] = useState(0.3);
  const [ease, setEase] = useState("easeInOut");
  const [trigger, setTrigger] = useState(0);

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Animation Type</label>
        <div className="flex bg-muted rounded-md p-1">
          <button 
            className={`flex-1 text-sm py-1.5 rounded-sm ${type === 'spring' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground'}`}
            onClick={() => setType('spring')}
          >
            Spring
          </button>
          <button 
            className={`flex-1 text-sm py-1.5 rounded-sm ${type === 'tween' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground'}`}
            onClick={() => setType('tween')}
          >
            Tween
          </button>
        </div>
      </div>

      {type === 'spring' ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-medium block">Stiffness</label>
              <span className="text-xs text-muted-foreground font-mono">{stiffness}</span>
            </div>
            <input type="range" min="50" max="1000" step="10" value={stiffness} onChange={e => setStiffness(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-medium block">Damping</label>
              <span className="text-xs text-muted-foreground font-mono">{damping}</span>
            </div>
            <input type="range" min="0" max="100" step="1" value={damping} onChange={e => setDamping(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-medium block">Mass</label>
              <span className="text-xs text-muted-foreground font-mono">{mass}</span>
            </div>
            <input type="range" min="0.1" max="10" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-medium block">Duration (s)</label>
              <span className="text-xs text-muted-foreground font-mono">{duration}</span>
            </div>
            <input type="range" min="0.1" max="2" step="0.1" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Easing</label>
            <select value={ease} onChange={e => setEase(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm">
              <option value="linear">Linear</option>
              <option value="easeIn">Ease In</option>
              <option value="easeOut">Ease Out</option>
              <option value="easeInOut">Ease In Out</option>
              <option value="circIn">Circ In</option>
              <option value="circOut">Circ Out</option>
              <option value="backIn">Back In</option>
              <option value="backOut">Back Out</option>
              <option value="anticipate">Anticipate</option>
            </select>
          </div>
        </div>
      )}

      <button 
        onClick={() => setTrigger(t => t + 1)}
        className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium mt-4 shadow-sm active:scale-95 transition-transform hover:opacity-90 cursor-pointer"
      >
        Replay Animation
      </button>
    </div>
  );

  useEffect(() => {
    setSidebarContent(controls);
    return () => setSidebarContent(null);
  }, [type, stiffness, damping, mass, duration, ease, setSidebarContent]);

  const codeSnippet = type === 'spring' 
    ? `transition={{ \n  type: "spring", \n  stiffness: ${stiffness}, \n  damping: ${damping}, \n  mass: ${mass} \n}}`
    : `transition={{ \n  type: "tween", \n  duration: ${duration}, \n  ease: "${ease}" \n}}`;

  return (
    <div className="space-y-8 pb-24 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Motion Lab</h1>
        <p className="text-muted-foreground text-lg">Visually construct and test physics-based animations and easing curves.</p>
      </div>

      <div className="border border-border rounded-lg overflow-hidden flex flex-col shadow-sm">
        <div className="p-12 flex flex-col items-center justify-center bg-muted/20 min-h-[400px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] relative">
          
          <div className="flex gap-12 w-full justify-center mt-8">
            <motion.div
              key={`scale-${trigger}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={type === 'spring' ? { type: "spring", stiffness, damping, mass } : { type: "tween", duration, ease: ease as any }}
              className="w-24 h-24 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-medium text-sm"
            >
              Scale
            </motion.div>

            <motion.div
              key={`slide-${trigger}`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={type === 'spring' ? { type: "spring", stiffness, damping, mass } : { type: "tween", duration, ease: ease as any }}
              className="w-24 h-24 bg-foreground rounded-full shadow-lg flex items-center justify-center text-background font-medium text-sm"
            >
              Slide
            </motion.div>
          </div>
          
        </div>
        <div className="bg-[#0d1117] text-sm overflow-x-auto p-4 border-t border-border flex justify-between items-center">
          <pre className="text-green-400 font-mono whitespace-pre">
            {codeSnippet}
          </pre>
          <button 
            onClick={() => navigator.clipboard.writeText(codeSnippet)}
            className="text-xs text-muted-foreground hover:text-white bg-white/10 px-3 py-1 rounded cursor-pointer"
          >
            Copy snippet
          </button>
        </div>
      </div>
    </div>
  );
}
