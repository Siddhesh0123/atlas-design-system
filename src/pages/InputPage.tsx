import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Input } from '../components/ui/Input';

export function InputPage() {
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter your email...");
  const [type, setType] = useState("text");

  const code = `<Input 
  type="${type}"
  placeholder="${placeholder}"${disabled ? '\n  disabled' : ''}
/>`;

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Type</label>
        <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm">
          <option value="text">Text</option>
          <option value="password">Password</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Placeholder</label>
        <input type="text" value={placeholder} onChange={e => setPlaceholder(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="disabled" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
      </div>
    </div>
  );

  return (
    <Playground title="Input" description="Displays a form input field or a component that looks like an input field." code={code} controls={controls}>
      <div className="w-full max-w-sm">
        <Input type={type} placeholder={placeholder} disabled={disabled} />
      </div>
    </Playground>
  );
}
