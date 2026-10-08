import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Tooltip } from '../components/ui/Tooltip';
import { Button } from '../components/ui/Button';

export function TooltipPage() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("top");
  const [content, setContent] = useState("Add to library");

  const code = `<Tooltip content="${content}" side="${side}">
  <Button variant="outline">Hover me</Button>
</Tooltip>`;

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Side</label>
        <select 
          value={side} 
          onChange={e => setSide(e.target.value as any)}
          className="w-full p-2 rounded-md border border-border bg-background text-sm"
        >
          <option value="top">Top</option>
          <option value="right">Right</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Content Text</label>
        <input 
          type="text" 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          className="w-full p-2 rounded-md border border-border bg-background text-sm" 
        />
      </div>
    </div>
  );

  return (
    <Playground title="Tooltip" description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it." code={code} controls={controls}>
      <div className="py-12">
        <Tooltip content={content} side={side}>
          <Button variant="outline">Hover over me</Button>
        </Tooltip>
      </div>
    </Playground>
  );
}
