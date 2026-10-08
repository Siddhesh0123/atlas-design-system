import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Checkbox } from '../components/ui/Checkbox';

export function CheckboxPage() {
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);

  const code = `<div className="flex items-center space-x-2">
  <Checkbox id="terms" ${checked ? 'checked ' : ''}${disabled ? 'disabled ' : ''}/>
  <label htmlFor="terms">Accept terms and conditions</label>
</div>`;

  const controls = (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <input type="checkbox" id="disabled" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="checked" checked={checked === true} onChange={e => setChecked(e.target.checked)} />
        <label htmlFor="checked" className="text-sm font-medium">Checked</label>
      </div>
    </div>
  );

  return (
    <Playground title="Checkbox" description="A control that allows the user to toggle between checked and not checked." code={code} controls={controls}>
      <div className="flex items-center space-x-2">
        <Checkbox checked={checked} onCheckedChange={setChecked} disabled={disabled} id="terms" />
        <label htmlFor="terms" className="text-sm font-medium text-foreground cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </label>
      </div>
    </Playground>
  );
}
