import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { IDish } from "@/interfaces/dish";

export function DishCardOrder({
  dish,
  onOrder,
}: {
  dish: IDish;
  onOrder: () => void;
}) {
  return (
    <Card className="bg-white">
      <CardContent className="p-2">
        <img
          className="relative aspect-video w-full bg-slate-900 rounded-lg object-cover"
          src={dish.picture}
        />
        <div className="mt-2 space-y-4">
          <div className="flex justify-between items-center">
            <h6 className="font-semibold text-lg capitalize">{dish.name}</h6>
            <span className="font-semibold">
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(dish.price)}
            </span>
          </div>
          <Button
            onClick={onOrder}
            className="w-full bg-[#1D2939] text-white py-2.5 hover:bg-[#1D2939]/90"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
