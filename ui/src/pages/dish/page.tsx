import { listDishes } from "@/actions/dish";
import { CreateDishDialog } from "@/components/create-dish-dialog";
import { DishCard } from "@/components/dish-card";
import AuthenticatedLayout from "@/layout/authenticated";
import useSWR from "swr";

export default function DishPage() {
  const { data, isLoading } = useSWR("dish-list", listDishes);

  return (
    <AuthenticatedLayout>
      <div className="p-5 ">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-lg">Manage Dish</h5>

          <CreateDishDialog />
        </div>

        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5 mt-5">
          {!isLoading &&
            data?.data.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
