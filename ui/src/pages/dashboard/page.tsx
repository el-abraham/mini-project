import { listDishes } from "@/actions/dish";
import { createOrder } from "@/actions/order";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { DishCardOrder } from "@/components/dish-card-order";
import OrderDishItem from "@/components/order-dish-item";
import { IOrderDish } from "@/interfaces/order-dish";
import AuthenticatedLayout from "@/layout/authenticated";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

export default function DashboardPage() {
  const { data, isLoading } = useSWR("dish-list", listDishes);

  // const { data: orders } = useSWR("order-list", listOrders);

  const [orderDishes, setOrderDishes] = useState<IOrderDish[]>([]);

  const handleAddOrderDish = (orderDish: IOrderDish) => {
    const existingOrderDish = orderDishes.find(
      (d) => d.dishId === orderDish.dishId
    );
    if (existingOrderDish) {
      const updatedOrderDishes = orderDishes.map((d) => {
        if (d.dishId === orderDish.dishId) {
          return {
            ...d,
            picture: d.picture,
            quantity: d.quantity + orderDish.quantity,
          };
        }
        return d;
      });
      setOrderDishes(updatedOrderDishes);
    } else {
      setOrderDishes([...orderDishes, orderDish]);
    }
  };

  const handleRemoveOrderDish = (dishId: number) => {
    const updatedOrderDishes = orderDishes.filter((d) => d.dishId !== dishId);
    setOrderDishes(updatedOrderDishes);
  };

  const totalPayment = useMemo(() => {
    return orderDishes.reduce(
      (acc, dish) => acc + dish.price * dish.quantity,
      0
    );
  }, [orderDishes]);

  const handleConfirmOrder = async () => {
    const res = await createOrder(orderDishes);
    if (res) {
      reset();
      mutate("dish-list");
      // mutate("order-list");
    }
  };

  const reset = () => {
    setOrderDishes([]);
  };

  return (
    <AuthenticatedLayout>
      {/* <div className="w-full p-5 pb-0 flex">
        <Card className="bg-white">
          <CardContent className="py-2 px-3">
            <div className="font-semibold">
              <h6>Total Orders : {orders?.data.length ?? 0}</h6>
            </div>
          </CardContent>
        </Card>
      </div> */}
      <div className="flex flex-col sm:flex-row p-5 gap-5 items-start">
        {isLoading ? (
          <div className="text-center border w-full py-4 text-sm font-semibold rounded-lg">
            Loading
          </div>
        ) : data?.data?.length ? (
          <div className="order-2 sm:order-1 w-full sm:w-6/12 md:w-8/12 xl:w-9/12 grid  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 items-start">
            {data?.data.map((dish) => (
              <DishCardOrder
                key={dish.id}
                dish={dish}
                onOrder={() =>
                  handleAddOrderDish({
                    dishId: dish.id,
                    quantity: 1,
                    name: dish.name,
                    picture: dish.picture,
                    price: dish.price,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center border w-full py-4 text-sm font-semibold rounded-lg">
            No dish yet
          </div>
        )}
        <div className="order-1 w-full sm:order-2 sm:w-6/12 md:w-4/12 xl:w-3/12">
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="w-full">
                <div className="p-4 flex justify-between items-center">
                  <h6 className="font-semibold">Order Summary</h6>
                </div>
                <hr />
                <div className="p-4">
                  <div className="space-y-3">
                    {orderDishes.length > 0 ? (
                      orderDishes.map((orderDish) => {
                        return (
                          <OrderDishItem
                            key={orderDish.dishId}
                            orderDish={orderDish}
                            onDeleteItem={() => {
                              handleRemoveOrderDish(orderDish.dishId);
                            }}
                          />
                        );
                      })
                    ) : (
                      <div className="text-center border w-full py-4 text-sm font-semibold">
                        No order yet
                      </div>
                    )}
                  </div>

                  <div className="mt-10 space-y-3">
                    <Card>
                      <CardContent className="p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Total Payment</span>
                          <span className="font-semibold">
                            {Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(totalPayment)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Button
                      type="submit"
                      disabled={orderDishes.length === 0}
                      onClick={handleConfirmOrder}
                      className="w-full bg-[#1D2939] text-white py-2.5 hover:bg-[#1D2939]/90"
                    >
                      Confirm Payment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
