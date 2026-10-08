import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { DesignTokensPage } from './pages/DesignTokensPage';
import { ButtonPage } from './pages/ButtonPage';
import { InputPage } from './pages/InputPage';
import { SwitchPage } from './pages/SwitchPage';
import { CheckboxPage } from './pages/CheckboxPage';
import { TabsPage } from './pages/TabsPage';
import { TooltipPage } from './pages/TooltipPage';
import { CardPage } from './pages/CardPage';
import { MotionLabPage } from './pages/MotionLabPage';

function AppContent() {
  const { theme, setTheme } = useTheme();
  const { sidebarContent } = useSidebar();
  const [activeTab, setActiveTab] = useState('tokens');

  const navButton = (id: string, label: string) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${activeTab === id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground'} cursor-pointer`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-border bg-muted/30 p-4 flex flex-col gap-4 overflow-y-auto">
        <div className="font-bold text-xl tracking-tight">Atlas</div>
        <nav className="flex flex-col gap-2 mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">Foundation</div>
          {navButton('tokens', 'Design Tokens')}
          {navButton('motion', 'Motion Lab')}
          
          <div className="text-sm font-medium text-muted-foreground mt-6 mb-1">Primitives (Ph.3)</div>
          {navButton('button', 'Button')}
          {navButton('input', 'Input')}
          {navButton('switch', 'Switch')}
          {navButton('checkbox', 'Checkbox')}
          {navButton('tabs', 'Tabs')}
          {navButton('tooltip', 'Tooltip')}
          
          <div className="text-sm font-medium text-muted-foreground mt-6 mb-1">Advanced (Ph.4)</div>
          {navButton('card', 'Card')}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'tokens' && <DesignTokensPage key="tokens" />}
          {activeTab === 'button' && <ButtonPage key="button" />}
          {activeTab === 'input' && <InputPage key="input" />}
          {activeTab === 'switch' && <SwitchPage key="switch" />}
          {activeTab === 'checkbox' && <CheckboxPage key="checkbox" />}
          {activeTab === 'tabs' && <TabsPage key="tabs" />}
          {activeTab === 'tooltip' && <TooltipPage key="tooltip" />}
          {activeTab === 'card' && <CardPage key="card" />}
          {activeTab === 'motion' && <MotionLabPage key="motion" />}
        </AnimatePresence>
      </main>

      {/* Right Sticky Panel (Props / Tokens Editor) */}
      <aside className="w-80 border-l border-border bg-muted/30 p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Configuration</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Theme Presets</label>
            <div className="flex flex-wrap gap-2">
              {['light', 'dark', 'paper', 'midnight'].map(t => (
                <button 
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${theme === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            {sidebarContent ? sidebarContent : (
              <div className="text-sm text-muted-foreground italic">
                Component-specific props will appear here.
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </ThemeProvider>
  );
}
