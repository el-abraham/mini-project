import { IOrderDish } from "@/interfaces/order-dish";
import { IHttpResponse } from "@/interfaces/response";
import { TokenService } from "@/lib/token";
import { BASE_URL } from "@/lib/utils";

export async function createOrder(dishes: IOrderDish[]) {
  const token = TokenService.getToken();

  const res = await fetch(BASE_URL + "/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
    body: JSON.stringify({
      dishes: dishes.map((d) => ({
        dish_id: d.dishId,
        quantity: d.quantity,
        price: d.price,
      })),
    }),
  });

  if (res.status === 200) {
    return true;
  }

  return false;
}

export async function listOrders() {
  const token = TokenService.getToken();

  const res = await fetch(BASE_URL + "/order/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (res.status === 200) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json = (await res.json()) as IHttpResponse<any[]>;
    return json;
  }

  return null;
}
