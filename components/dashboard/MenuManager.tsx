"use client";

import { useActionState, useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";

import {
  createCategoryAction,
  deleteCategoryAction,
  moveCategoryAction,
  renameCategoryAction,
} from "@/app/actions/categories";
import {
  createItemAction,
  deleteItemAction,
  moveItemAction,
  toggleItemFlagAction,
  updateItemAction,
} from "@/app/actions/items";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState, CategoryPublic, MenuItemPublic } from "@/lib/types";

const initial: ActionState = {};

type MenuManagerProps = {
  categories: CategoryPublic[];
  items: MenuItemPublic[];
  currency: string;
};

export function MenuManager({ categories, items, currency }: MenuManagerProps) {
  const [catState, createCategory, catPending] = useActionState(
    createCategoryAction,
    initial,
  );

  return (
    <div className="space-y-8">
      <form action={createCategory} className="flex max-w-md flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="category-name">New category</Label>
          <Input id="category-name" name="name" placeholder="Starters, Mains…" required />
        </div>
        <Button type="submit" disabled={catPending}>
          Add
        </Button>
      </form>
      {catState.error ? (
        <p className="text-sm text-destructive">{catState.error}</p>
      ) : null}

      {categories.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          Add your first category, then items inside it.
        </p>
      ) : null}

      <div className="space-y-6">
        {categories.map((category, index) => {
          const categoryItems = items.filter((item) => item.categoryId === category.id);
          return (
            <section key={category.id} className="rounded-xl ring-1 ring-foreground/10">
              <header className="flex flex-wrap items-center gap-2 border-b px-4 py-3">
                <h2 className="mr-auto font-semibold">{category.name}</h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={index === 0}
                  onClick={async () => {
                    await moveCategoryAction(category.id, "up");
                  }}
                >
                  <ChevronUp />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={index === categories.length - 1}
                  onClick={async () => {
                    await moveCategoryAction(category.id, "down");
                  }}
                >
                  <ChevronDown />
                </Button>
                <RenameCategoryButton category={category} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={async () => {
                    if (!confirm(`Delete “${category.name}” and its items?`)) return;
                    await deleteCategoryAction(category.id);
                    toast.success("Category deleted");
                  }}
                >
                  <Trash2 />
                </Button>
                <ItemDialog
                  categories={categories}
                  defaultCategoryId={category.id}
                  currency={currency}
                />
              </header>
              <div className="divide-y">
                {categoryItems.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-muted-foreground">
                    No items in this category yet.
                  </p>
                ) : (
                  categoryItems.map((item, itemIndex) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      currency={currency}
                      categories={categories}
                      isFirst={itemIndex === 0}
                      isLast={itemIndex === categoryItems.length - 1}
                    />
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function RenameCategoryButton({ category }: { category: CategoryPublic }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [pending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(true)}
      >
        <Pencil />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename category</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            startTransition(async () => {
              const result = await renameCategoryAction(category.id, name);
              if (result.error) toast.error(result.error);
              else {
                toast.success("Renamed");
                setOpen(false);
              }
            });
          }}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
          <Button type="submit" disabled={pending}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ItemRow({
  item,
  currency,
  categories,
  isFirst,
  isLast,
}: {
  item: MenuItemPublic;
  currency: string;
  categories: CategoryPublic[];
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{item.name}</p>
          {item.isSpecial ? <Badge>Today&apos;s Special</Badge> : null}
          {!item.isAvailable ? (
            <Badge variant="secondary">Unavailable</Badge>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">
          {currency}
          {item.price.toFixed(0)} · {item.isVeg ? "Veg" : "Non-veg"}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs">
          <Switch
            size="sm"
            checked={item.isAvailable}
            onCheckedChange={async (checked) => {
              await toggleItemFlagAction(item.id, "isAvailable", checked);
            }}
          />
          Available
        </label>
        <label className="flex items-center gap-2 text-xs">
          <Switch
            size="sm"
            checked={item.isSpecial}
            onCheckedChange={async (checked) => {
              await toggleItemFlagAction(item.id, "isSpecial", checked);
            }}
          />
          Special
        </label>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={isFirst}
          onClick={() => moveItemAction(item.id, "up")}
        >
          <ChevronUp />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={isLast}
          onClick={() => moveItemAction(item.id, "down")}
        >
          <ChevronDown />
        </Button>
        <ItemDialog
          categories={categories}
          defaultCategoryId={item.categoryId}
          currency={currency}
          item={item}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={async () => {
            if (!confirm(`Delete “${item.name}”?`)) return;
            await deleteItemAction(item.id);
            toast.success("Item deleted");
          }}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

function ItemDialog({
  categories,
  defaultCategoryId,
  currency,
  item,
}: {
  categories: CategoryPublic[];
  defaultCategoryId: string;
  currency: string;
  item?: MenuItemPublic;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [createState, createItem, createPending] = useActionState(
    async (prev: ActionState, formData: FormData) => {
      const result = await createItemAction(prev, formData);
      if (result.success) setOpen(false);
      return result;
    },
    initial,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant={item ? "ghost" : "outline"}
        size={item ? "icon-sm" : "sm"}
        onClick={() => setOpen(true)}
      >
        {item ? <Pencil /> : <><Plus className="size-3.5" /> Item</>}
      </Button>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? "Edit item" : "Add item"}</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          action={item ? undefined : createItem}
          onSubmit={
            item
              ? (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  startTransition(async () => {
                    const result = await updateItemAction(item.id, formData);
                    if (result.error) toast.error(result.error);
                    else {
                      toast.success("Item updated");
                      setOpen(false);
                    }
                  });
                }
              : undefined
          }
        >
          <div className="space-y-2">
            <Label htmlFor={`name-${item?.id ?? "new"}`}>Name</Label>
            <Input
              id={`name-${item?.id ?? "new"}`}
              name="name"
              defaultValue={item?.name}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`desc-${item?.id ?? "new"}`}>Description</Label>
            <Textarea
              id={`desc-${item?.id ?? "new"}`}
              name="description"
              defaultValue={item?.description}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`price-${item?.id ?? "new"}`}>Price ({currency})</Label>
              <Input
                id={`price-${item?.id ?? "new"}`}
                name="price"
                type="number"
                min="0"
                step="1"
                defaultValue={item?.price ?? 0}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cat-${item?.id ?? "new"}`}>Category</Label>
              <select
                id={`cat-${item?.id ?? "new"}`}
                name="categoryId"
                defaultValue={defaultCategoryId}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ImageUpload
            name="imageUrl"
            label="Photo"
            defaultUrl={item?.imageUrl}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isVeg"
              defaultChecked={item?.isVeg ?? true}
              className="size-4 accent-primary"
            />
            Vegetarian
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isAvailable"
              defaultChecked={item?.isAvailable ?? true}
              className="size-4 accent-primary"
            />
            Available
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isSpecial"
              defaultChecked={item?.isSpecial ?? false}
              className="size-4 accent-primary"
            />
            Today&apos;s special
          </label>
          {createState.error ? (
            <p className="text-sm text-destructive">{createState.error}</p>
          ) : null}
          <Button type="submit" disabled={pending || createPending}>
            {item ? "Save changes" : "Add item"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
