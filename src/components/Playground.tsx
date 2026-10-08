import React, { useEffect, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { codeToHtml } from 'shiki';

interface PlaygroundProps {
  title: string;
  description: string;
  code: string;
  controls: React.ReactNode;
  children: React.ReactNode;
}

export function Playground({ title, description, code, controls, children }: PlaygroundProps) {
  const { setSidebarContent } = useSidebar();
  const [html, setHtml] = useState("");

  useEffect(() => {
    setSidebarContent(controls);
    return () => setSidebarContent(null);
  }, [controls, setSidebarContent]);

  useEffect(() => {
    codeToHtml(code, {
      lang: 'tsx',
      theme: 'github-dark'
    }).then(setHtml);
  }, [code]);

  return (
    <div className="space-y-8 pb-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <div className="border border-border rounded-lg overflow-hidden flex flex-col shadow-sm">
        <div className="p-12 flex items-center justify-center bg-muted/20 min-h-[300px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]">
          {children}
        </div>
        <div className="bg-[#0d1117] text-sm overflow-x-auto p-4 border-t border-border" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
