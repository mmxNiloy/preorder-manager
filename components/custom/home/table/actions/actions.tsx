import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DeleteAction from "./delete-action";
import Link from "next/link";

type Props = {
  id: string;
};

export default function Actions({ id }: Props) {
  return (
    <div className="flex gap-4">
      <Link href={`/preorder/${id}`} passHref>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </Link>

      <DeleteAction id={id} />
    </div>
  );
}
