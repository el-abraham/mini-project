import { Trash } from "lucide-react";
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
import { useState } from "react";
import { deleteDish } from "@/actions/dish";
import { mutate } from "swr";

export function DeleteDishDialog({ dishId }: { dishId: number }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteDish(dishId);
    if (res) {
      setOpen(false);
      mutate("dish-list");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#BF2801] text-white py-2.5 hover:bg-[#BF2801]/90">
          <Trash size={16} />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Dish</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>Are you sure you want to delete this dish?</div>

        <DialogFooter className="gap-2">
          <Button
            className="bg-[#1D2939] text-white py-2.5 px-4"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 bg-[#BF2801] text-white py-2.5 hover:bg-[#BF2801]/90"
            type="submit"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
