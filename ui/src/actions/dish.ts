import { IDish } from "@/interfaces/dish";
import { IHttpResponse } from "@/interfaces/response";
import { TokenService } from "@/lib/token";
import { BASE_URL } from "@/lib/utils";

export async function listDishes() {
  const token = TokenService.getToken();

  const res = await fetch(BASE_URL + "/dish/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (res.status === 200) {
    const json = (await res.json()) as IHttpResponse<IDish[]>;
    return json;
  }

  return null;
}

export async function createDish(dish: Partial<IDish>) {
  const token = TokenService.getToken();

  const res = await fetch(BASE_URL + "/dish/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
    body: JSON.stringify({
      name: dish.name,
      price: dish.price,
      picture: dish.picture,
    }),
  });

  if (res.status === 200) {
    const json = (await res.json()) as IHttpResponse<IDish>;
    return json;
  }

  return null;
}

export async function updateDish(dish: Partial<IDish>) {
  const token = TokenService.getToken();

  const res = await fetch(`${BASE_URL}/dish/update/${dish.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
    body: JSON.stringify({
      name: dish.name,
      price: dish.price,
      picture: dish.picture,
    }),
  });

  if (res.status === 200) {
    const json = (await res.json()) as IHttpResponse<IDish>;
    return json;
  }

  return null;
}

export async function deleteDish(dishId: number) {
  const token = TokenService.getToken();
  const res = await fetch(`${BASE_URL}/dish/delete/${dishId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (res.status === 200) {
    return true;
  }

  return false;
}
