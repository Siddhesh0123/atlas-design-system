import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Switch } from '../components/ui/Switch';

export function SwitchPage() {
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);

  const code = `<Switch ${checked ? 'checked ' : ''}${disabled ? 'disabled ' : ''}/>`;

  const controls = (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="disabled" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="checked" checked={checked} onChange={e => setChecked(e.target.checked)} />
        <label htmlFor="checked" className="text-sm font-medium">Checked</label>
      </div>
    </div>
  );

  return (
    <Playground title="Switch" description="A control that allows the user to toggle between checked and not checked." code={code} controls={controls}>
      <div className="flex items-center space-x-2">
        <Switch checked={checked} onCheckedChange={setChecked} disabled={disabled} id="airplane-mode" />
        <label htmlFor="airplane-mode" className="text-sm font-medium text-foreground cursor-pointer">Airplane Mode</label>
      </div>
    </Playground>
  );
}
