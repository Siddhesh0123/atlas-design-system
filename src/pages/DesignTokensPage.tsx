import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function DesignTokensPage() {
  const { tokens, updateToken, theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const getCssVar = (varName: string) => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  };

  const currentColor = (key: 'primary' | 'background' | 'foreground' | 'accent' | 'border') => {
    return tokens?.[key] || getCssVar(`--${key}`);
  };

  const handleColorChange = (key: 'primary' | 'background' | 'foreground' | 'accent' | 'border', e: React.ChangeEvent<HTMLInputElement>) => {
    updateToken(key, e.target.value);
  };

  const exportCss = `@theme {
  --color-primary: ${currentColor('primary') || 'var(--primary)'};
  --color-background: ${currentColor('background') || 'var(--background)'};
  --color-foreground: ${currentColor('foreground') || 'var(--foreground)'};
  --color-accent: ${currentColor('accent') || 'var(--accent)'};
  --color-border: ${currentColor('border') || 'var(--border)'};
  
  --radius-sm: ${(tokens?.radius || 4) / 2}px;
  --radius-md: ${tokens?.radius || 4}px;
  --radius-lg: ${(tokens?.radius || 4) * 2}px;
  
  --spacing-1: ${0.25 * (tokens?.spacingBase || 1)}rem;
  --spacing-4: ${1 * (tokens?.spacingBase || 1)}rem;
  --spacing-8: ${2 * (tokens?.spacingBase || 1)}rem;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-24"
    >
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Design Tokens</h1>
      <p className="text-muted-foreground text-lg mb-12">
        Customize the core visual attributes of your design system. Changes reflect instantly across the entire playground.
      </p>

      <div className="space-y-12">
        {/* Colors Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border">Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { id: 'primary', label: 'Primary' },
              { id: 'background', label: 'Background' },
              { id: 'foreground', label: 'Foreground' },
              { id: 'accent', label: 'Accent' },
              { id: 'border', label: 'Border' },
            ].map((color) => (
              <div key={color.id} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">{color.label}</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-md border border-border overflow-hidden shadow-sm">
                    <input
                      type="color"
                      value={currentColor(color.id as any)}
                      onChange={(e) => handleColorChange(color.id as any, e)}
                      className="absolute inset-[-10px] w-20 h-20 cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono uppercase">
                    {currentColor(color.id as any) || 'var'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing & Radius Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border">Geometry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Radius */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-medium text-foreground">Base Radius</label>
                <span className="text-xs text-muted-foreground font-mono">{tokens?.radius || 4}px</span>
              </div>
              <input 
                type="range" 
                min="0" max="24" step="2"
                value={tokens?.radius || 4}
                onChange={(e) => updateToken('radius', parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="mt-6 flex gap-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-sm" style={{ borderRadius: 'var(--radius-sm)' }}>sm</div>
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-md" style={{ borderRadius: 'var(--radius-md)' }}>md</div>
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-lg" style={{ borderRadius: 'var(--radius-lg)' }}>lg</div>
              </div>
            </div>

            {/* Spacing */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-medium text-foreground">Spacing Scale Multiplier</label>
                <span className="text-xs text-muted-foreground font-mono">{tokens?.spacingBase || 1}x</span>
              </div>
              <input 
                type="range" 
                min="0.5" max="2" step="0.1"
                value={tokens?.spacingBase || 1}
                onChange={(e) => updateToken('spacingBase', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="mt-6 flex items-end gap-2 h-16">
                <div className="bg-accent rounded-sm w-4" style={{ height: 'var(--spacing-2)' }} title="spacing-2"></div>
                <div className="bg-accent rounded-sm w-4" style={{ height: 'var(--spacing-4)' }} title="spacing-4"></div>
                <div className="bg-accent rounded-sm w-4" style={{ height: 'var(--spacing-6)' }} title="spacing-6"></div>
                <div className="bg-accent rounded-sm w-4" style={{ height: 'var(--spacing-8)' }} title="spacing-8"></div>
                <div className="bg-accent rounded-sm w-4" style={{ height: 'var(--spacing-10)' }} title="spacing-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Sample */}
        <section className="p-8 rounded-lg border border-border bg-muted/20">
          <h3 className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">Live Preview</h3>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:opacity-90 transition-opacity">Primary Action</button>
              <button className="px-4 py-2 bg-transparent text-foreground border border-border rounded-md hover:bg-accent transition-colors">Secondary Action</button>
            </div>
            <div className="p-4 bg-background border border-border rounded-lg shadow-md max-w-sm">
              <h4 className="font-semibold mb-2">Card Component</h4>
              <p className="text-muted-foreground text-sm">This is a sample card to show how background, border, foreground, and radius tokens interact.</p>
            </div>
          </div>
        </section>

        {/* Export Section */}
        <section className="pt-8 border-t border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Export Theme</h2>
            <button 
              onClick={handleCopy}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:opacity-90 text-sm font-medium transition-all"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <p className="text-muted-foreground mb-4">Paste this directly into your CSS file when using Tailwind CSS v4 to apply these design tokens globally.</p>
          <pre className="p-4 bg-[#0d1117] text-green-400 font-mono text-sm rounded-lg overflow-x-auto border border-border">
            {exportCss}
          </pre>
        </section>
      </div>
    </motion.div>
  );
}
