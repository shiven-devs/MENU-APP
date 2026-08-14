"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { toggleOpenAction } from "@/app/actions/restaurant";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function OpenToggle({ isOpen }: { isOpen: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={isOpen}
        disabled={pending}
        onCheckedChange={(checked) => {
          startTransition(async () => {
            await toggleOpenAction(checked);
            toast.success(checked ? "Restaurant marked open" : "Restaurant marked closed");
          });
        }}
        id="open-toggle"
      />
      <Label htmlFor="open-toggle">{isOpen ? "Open" : "Closed"}</Label>
    </div>
  );
}
