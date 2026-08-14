import { Button } from "@/components/ui/button";

type RestaurantQrProps = {
  restaurantName: string;
  menuUrl: string;
  qrDataUrl: string;
};

export function RestaurantQr({
  restaurantName,
  menuUrl,
  qrDataUrl,
}: RestaurantQrProps) {
  const fileName = `${restaurantName.replace(/[^\w\s-]/g, "").trim() || "menu"}-qr.png`;

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      {/* data: URLs are generated PNGs, not Cloudinary files — next/image is the wrong tool */}
      <img
        src={qrDataUrl}
        alt={`QR code for ${restaurantName}`}
        className="size-48 rounded-lg bg-white p-2 ring-1 ring-foreground/10"
      />
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Print this same code for every table. Guests all land on one menu.
        </p>
        <p className="break-all text-xs text-muted-foreground">{menuUrl}</p>
        <Button asChild>
          <a href={qrDataUrl} download={fileName}>
            Download PNG
          </a>
        </Button>
      </div>
    </div>
  );
}
