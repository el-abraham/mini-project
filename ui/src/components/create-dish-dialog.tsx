import { Salad } from "lucide-react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { useRef, useState } from "react";
import { createDish } from "@/actions/dish";
import { mutate } from "swr";
import { IError } from "@/interfaces/common";
import { ErrorLabel } from "./error-label";

export function CreateDishDialog() {
  const [open, setOpen] = useState(false);

  const dishName = useRef<HTMLInputElement>(null);
  const dishPrice = useRef<HTMLInputElement>(null);
  const dishPicture = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<IError[]>([]);

  const handleSave = async () => {
    if (validate()) return;

    const name = dishName.current?.value;
    const price = dishPrice.current?.value;
    const picture = dishPicture.current?.value;

    const res = await createDish({ name, price: Number(price), picture });
    if (res) {
      mutate("dish-list");
      setOpen(false);
    }
  };

  const validate = () => {
    const errors: IError[] = [];
    if (!dishName.current?.value) {
      errors.push({
        message: "Name is required",
        key: "name",
      });
    }
    if (!dishPrice.current?.value) {
      errors.push({
        message: "Price is required",
        key: "price",
      });
    }
    if (!dishPicture.current?.value) {
      errors.push({
        message: "Picture is required",
        key: "picture",
      });
    }

    setErrors(errors);
    return errors.length > 0;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="border py-2 px-3">
          <Salad size={16} />
          <span>Add Dish</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Dish</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <label
              htmlFor="name"
              className="text-right text-sm font-semibold pt-2.5"
            >
              Name
            </label>
            <div className="col-span-3">
              <Input ref={dishName} id="name" className="mb-1.5" />
              <ErrorLabel
                message={errors.find((e) => e.key === "name")?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label
              htmlFor="price"
              className="text-right text-sm font-semibold pt-2.5"
            >
              Price
            </label>
            <div className="col-span-3">
              <Input
                type="number"
                ref={dishPrice}
                id="price"
                className="mb-1.5"
              />
              <ErrorLabel
                message={errors.find((e) => e.key === "price")?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <label
              htmlFor="picture"
              className="text-right text-sm font-semibold pt-2.5"
            >
              URL Picture
            </label>
            <div className="col-span-3">
              <Input ref={dishPicture} id="picture" className="mb-1.5" />
              <ErrorLabel
                message={errors.find((e) => e.key === "picture")?.message}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-[#1D2939] text-white py-2.5 hover:bg-[#1D2939]/90"
            type="submit"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
