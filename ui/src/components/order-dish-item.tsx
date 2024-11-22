import { Trash } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { IOrderDish } from "@/interfaces/order-dish";

export default function OrderDishItem({
  orderDish,
  onDeleteItem,
}: {
  orderDish: IOrderDish;
  onDeleteItem: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-2">
        <div className="flex space-x-2">
          <img
            className="aspect-square w-20 bg-blue-400 rounded object-cover"
            src={orderDish.picture}
          />
          <div className="flex flex-col flex-1">
            <div className="flex-1">
              <span className="font-semibold">{orderDish.name}</span> (
              {orderDish.quantity})
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(orderDish.price)}
              </span>
              <Button onClick={onDeleteItem}>
                <Trash size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
