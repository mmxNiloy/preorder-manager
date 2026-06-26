"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePreorder } from "@/src/app/(server)";
import { Loader2, Trash2 } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function DeleteAction({ id }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, startDelete] = useTransition();

  const handleDelete = useCallback(() => {
    startDelete(async () => {
      try {
        const res = await deletePreorder(id);

        if (res.ok) {
          toast.success(res.message);
          setOpen(false);
          return;
        }

        toast.error(res.message);
      } catch (error) {
        console.error(
          "[PreorderTable > DeleteAction] Failed to delete the preorder",
          error,
        );
        toast.error("Failed to delete the preorder. Please try again.");
      }
    });
  }, [id]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="outline" size="icon-sm">
            <Trash2 />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this preorder?
          </AlertDialogTitle>
          <AlertDialogDescription>
            The preorder will be deleted <em>permanently</em> and{" "}
            <em>cannot be recovered</em>. Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="*:cursor-pointer">
          <AlertDialogCancel variant="ghost" disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            variant={"destructive"}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
