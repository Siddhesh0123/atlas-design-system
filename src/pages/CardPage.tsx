import React, { useState } from 'react';
import { Playground } from '../components/Playground';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function CardPage() {
  const [title, setTitle] = useState("Create project");
  const [desc, setDesc] = useState("Deploy your new project in one-click.");

  const code = `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${desc}</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`;

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="w-full p-2 rounded-md border border-border bg-background text-sm" 
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Description</label>
        <input 
          type="text" 
          value={desc} 
          onChange={e => setDesc(e.target.value)} 
          className="w-full p-2 rounded-md border border-border bg-background text-sm" 
        />
      </div>
    </div>
  );

  return (
    <Playground title="Card" description="Displays a card with header, content, and footer." code={code} controls={controls}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </Playground>
  );
}
