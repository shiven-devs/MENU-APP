"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { uploadImageAction } from "@/app/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ImageUploadProps = {
  name: string;
  label: string;
  defaultUrl?: string;
};

export function ImageUpload({ name, label, defaultUrl = "" }: ImageUploadProps) {
  const [url, setUrl] = useState(defaultUrl);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    startTransition(async () => {
      const result = await uploadImageAction(data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      if (result.url) {
        setUrl(result.url);
        toast.success("Image uploaded");
      }
    });
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative h-28 w-full overflow-hidden rounded-lg ring-1 ring-foreground/10">
          <Image
            src={url}
            alt=""
            fill
            className="object-cover"
            sizes="512px"
          />
        </div>
      ) : null}
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="h-auto py-1.5"
          onChange={(event) => onFile(event.target.files?.[0])}
        />
        {url ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setUrl("");
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            Remove
          </Button>
        ) : null}
      </div>
      {pending ? <p className="text-xs text-muted-foreground">Uploading…</p> : null}
    </div>
  );
}
