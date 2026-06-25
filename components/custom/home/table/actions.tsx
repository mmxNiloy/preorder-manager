import { Button } from "@/components/ui/button";
import { Preorder } from "@/src/generated/prisma/client";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  data: Preorder;
};

export default function Actions({ data }: Props) {
  return (
    <div className="flex gap-4">
      <Button variant="outline" size="icon">
        <Pencil />
      </Button>
      <Button variant="outline" size="icon">
        <Trash2 />
      </Button>
    </div>
  );
}
