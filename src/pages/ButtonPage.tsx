import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Button } from '../components/ui/Button';

export function ButtonPage() {
  const [variant, setVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default");
  const [size, setSize] = useState<"default" | "sm" | "lg" | "icon">("default");
  const [disabled, setDisabled] = useState(false);

  const code = `<Button 
  variant="${variant}" 
  size="${size}"${disabled ? '\n  disabled' : ''}
>
  Button
</Button>`;

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Variant</label>
        <select 
          value={variant} 
          onChange={e => setVariant(e.target.value as any)}
          className="w-full p-2 rounded-md border border-border bg-background text-sm"
        >
          <option value="default">Default</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
          <option value="ghost">Ghost</option>
          <option value="destructive">Destructive</option>
          <option value="link">Link</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Size</label>
        <select 
          value={size} 
          onChange={e => setSize(e.target.value as any)}
          className="w-full p-2 rounded-md border border-border bg-background text-sm"
        >
          <option value="default">Default</option>
          <option value="sm">Small</option>
          <option value="lg">Large</option>
          <option value="icon">Icon</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="disabled" 
          checked={disabled} 
          onChange={e => setDisabled(e.target.checked)} 
        />
        <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
      </div>
    </div>
  );

  return (
    <Playground
      title="Button"
      description="Displays a button or a component that looks like a button."
      code={code}
      controls={controls}
    >
      <Button variant={variant} size={size} disabled={disabled}>
        {size === 'icon' ? '+' : 'Button'}
      </Button>
    </Playground>
  );
}
