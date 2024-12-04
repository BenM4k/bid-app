"use client";
import { uploadItem } from "@/actions/items-actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DatePickerDemo } from "./date-picker";
import { useState } from "react";

export default function UploadForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!date) {
          return;
        }

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const startingPrice = parseInt(formData.get("startingPrice") as string);
        const startingPriceInCents = Math.floor(startingPrice * 100);

        await uploadItem({
          name,
          startingPrice: startingPriceInCents,
          endDate: date,
        });
      }}
      className="flex flex-col border p-8 rounded-xl space-y-4 my-6 max-w-lg"
    >
      <Input
        required
        name="name"
        placeholder="Name your Item"
        className="max-w-lg"
      />
      <Input
        required
        name="startingPrice"
        placeholder="What to start your auction at"
        type="number"
        className="max-w-lg"
      />
      <DatePickerDemo date={date} setDate={setDate} />
      <Button type="submit" className="self-end">
        Post Item
      </Button>
    </form>
  );
}
