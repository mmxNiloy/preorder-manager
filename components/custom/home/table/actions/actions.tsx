import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DeleteAction from "./delete-action";
import Link from "next/link";

type Props = {
  id: string;
};

export default function Actions({ id }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon-sm" render={<Link href={`/preorder/${id}`} />}>
        <Pencil />
      </Button>

      <DeleteAction id={id} />
    </div>
  );
}
