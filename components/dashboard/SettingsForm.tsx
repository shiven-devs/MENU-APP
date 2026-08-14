"use client";

import { useActionState } from "react";

import { updateSettingsAction } from "@/app/actions/restaurant";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState, RestaurantPublic } from "@/lib/types";

const initial: ActionState = {};

export function SettingsForm({ restaurant }: { restaurant: RestaurantPublic }) {
  const [state, formAction, pending] = useActionState(
    updateSettingsAction,
    initial,
  );

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Restaurant name</Label>
        <Input id="name" name="name" defaultValue={restaurant.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">URL slug</Label>
        <Input id="slug" name="slug" defaultValue={restaurant.slug} required />
        <p className="text-xs text-muted-foreground">
          Public menu: /r/{restaurant.slug}
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={restaurant.description}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={restaurant.address} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactNumber">Contact number</Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          defaultValue={restaurant.contactNumber}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currency">Currency symbol</Label>
        <Input
          id="currency"
          name="currency"
          defaultValue={restaurant.currency}
          maxLength={8}
        />
      </div>
      <ImageUpload name="logoUrl" label="Logo" defaultUrl={restaurant.logoUrl} />
      <ImageUpload
        name="coverImageUrl"
        label="Cover image"
        defaultUrl={restaurant.coverImageUrl}
      />
      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-primary">{state.success}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
