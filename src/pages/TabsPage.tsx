import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

export function TabsPage() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  const code = `<Tabs defaultValue="account" orientation="${orientation}" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`;

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Orientation</label>
        <select 
          value={orientation} 
          onChange={e => setOrientation(e.target.value as any)}
          className="w-full p-2 rounded-md border border-border bg-background text-sm"
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
        <p className="text-xs text-muted-foreground mt-1">Note: Vertical styling requires additional CSS, horizontal is standard.</p>
      </div>
    </div>
  );

  return (
    <Playground title="Tabs" description="A set of layered sections of content—known as tab panels—that are displayed one at a time." code={code} controls={controls}>
      <Tabs defaultValue="account" orientation={orientation} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-6 border border-border rounded-lg mt-4 bg-background shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Account Details</h3>
          <p className="text-sm text-muted-foreground mb-4">Make changes to your account here. Click save when you're done.</p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity">Save changes</button>
        </TabsContent>
        <TabsContent value="password" className="p-6 border border-border rounded-lg mt-4 bg-background shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Password Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">Change your password here. After saving, you'll be logged out.</p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity">Change password</button>
        </TabsContent>
      </Tabs>
    </Playground>
  );
}
