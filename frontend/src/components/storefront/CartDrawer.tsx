import { Minus, Plus, ShoppingBag, Trash } from "@phosphor-icons/react";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeName: string;
};

function CartDrawer({ open, onOpenChange, storeName }: CartDrawerProps) {
  const { items, subtotalCents, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item${items.length === 1 ? "" : "s"} from ${storeName}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="size-12 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">
                Browse products and add items to your cart.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4">
                  <div className="product-image-bg flex size-20 shrink-0 items-center justify-center rounded-lg">
                    <ShoppingBag className="size-8 text-primary/30" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-medium leading-snug">{product.name}</p>
                    <p className="text-sm font-semibold text-primary">
                      {formatPrice(product.priceCents, product.currency)}
                    </p>
                    <div className="mt-auto flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Plus />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="ml-auto text-muted-foreground"
                        onClick={() => removeItem(product.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <SheetFooter className="flex-col gap-4 sm:flex-col">
            <Separator />
            <div className="flex w-full items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">
                {formatPrice(subtotalCents, items[0]?.product.currency ?? "USD")}
              </span>
            </div>
            <Button size="lg" className="w-full">
              Proceed to checkout
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Checkout coming soon — cart saved locally for demo.
            </p>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export { CartDrawer };
