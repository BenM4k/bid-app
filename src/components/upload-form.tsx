import { uploadItem } from "@/actions/items-actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function UploadForm() {
  return (
    <form
      action={uploadItem}
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
      <Button type="submit" className="self-end">
        Post Item
      </Button>
    </form>
  );
}
