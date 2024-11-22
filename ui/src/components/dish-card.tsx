import { Card, CardContent } from "./card";
import { IDish } from "@/interfaces/dish";
import { DeleteDishDialog } from "./delete-dish-dialog";
import { UpdateDishDialog } from "./update-dish-dialog";

export function DishCard({ dish }: { dish: IDish }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-2">
        <img
          className="relative aspect-video w-full bg-slate-900 rounded-lg object-cover"
          src={dish.picture}
        />
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <h6 className="font-semibold text-lg ">{dish.name}</h6>
            <span className="font-semibold">
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(dish.price)}
            </span>
          </div>

          <div className="flex space-x-5">
            <UpdateDishDialog dish={dish} />
            <DeleteDishDialog dishId={dish.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
