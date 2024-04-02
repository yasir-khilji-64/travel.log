'use client';

import React, { useState } from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { TravelLogForm } from './TravelLogForm';

export default function TravelLogSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div className="fixed top-2 left-2 z-[999]">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary">Open</Button>
        </SheetTrigger>
        <SheetContent>
          <TravelLogForm onComplete={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
